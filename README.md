# Ecommerce backend API

## User manual

In order to use this API, you need to have docker engine installed.
At the root of the project (where docker-compose is), you need to provide file named
*"main.env"*, for configuration purposes. Example can be found down below:

```
#Database specific variables
PG_CONTAINER_NAME="postgres"
POSTGRES_DB="test"
POSTGRES_USER="armin"
POSTGRES_PASSWORD="mojasifra"
POSTGRES_PORT="5500"

NODE_ENV="development" #production | development

#paths needed to be configured on host OS-es
LOGS_PATH="C:\Users\38762\Downloads\logs"
BACKUP_PATH="C:\Users\38762\Downloads\backup"
```

## Development mode

Firstly, you need to get your database up and running. For that, you need to execute 
```
docker compose --env-file main.env up -d
```
in project root.

After that, in order to install all of dependencies, run **npm install**.

Now, in order to transpile your ts to js, change your directory to /api and run build:
```
cd ./api/
npm run build
```

All of the created files in /build are .js files. In order to communicate with sequelize-cli packages, which require some of the code to be commonjs type, we need to convert 
all of the files extensions inside ./database folder to .cjs. In powershell, you can do that by:
```
Dir -Recurse ./build/database/*.js | rename-item -newname { [io.path]::ChangeExtension($_.name, "cjs") }
```
Easiest way is to open new powershell in vSCode, and paste code below. For different shells, you will need to manage this problem by yourself.

If this is your first time setting up database, then you need to run **migrations** in order to create database schema. Do that with *sequelize-cli* with
```
npx sequelize-cli db:migrate
```

Also, if you want to add dummy data (**seed**) into the database, you need to run all of the seeds that are defined in this project by:
```
npx sequelize-cli db:seed:all
```

In case you want to revert these commands, you can check how to do it in ![migration section of sequelize library](https://sequelize.org/docs/v6/other-topics/migrations/)

Now, in order to develop this backend further, you can start it by running:
```
npm run dev
```
Or **npm run start** for production later.

## Production mode
Coming soon!

# Technical documentation summary

## Database 

Database is dockerized, and it is created using _migrations_ with _sequelize-cli_. This is mock database, for 
building generic and well design backend. Because of that, and because we wanted to make things as easy as possible, 
it is not complex. ER diagram is shown below:

![database](https://github.com/PetrovicArmin/logging-backup-generic-backend/assets/89392479/7d9c5ce3-01c7-445a-96a4-c43c336b7759)

## API

API has CRUD operations for:
* **Products**
* **SKUs**

It is build using **models**, **services**, and **controllers**. Services and controllers are generic, which means that 
adding CRUD for new resources is as easy as implementing interface / extending base class. Most useful components that are build on 
this backend, which are also highly reusable are as follows:

```
class BaseController<TDto, TSearch> {
    protected router = express.Router();

    constructor(
        protected service: IService<TDto, TSearch>,
        protected searchAttributes: string[]
    ){}

    async get(req: Request, res: Response) {
        try {
            res.status(200).json(await this.service.get(
                map(req.query, this.searchAttributes)
            ));
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            res.status(200).json(await this.service.getById(+req.params.id));
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    getRouter(): Router {
        this.router.get('/', (req: Request, res: Response) => this.get(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.getById(req, res));
        return this.router;
    }
}
```
```
class BaseCRUDController<TDto, TSearch, TInsert, TUpdate> extends BaseController<TDto, TSearch> {
    constructor(
        service: ICRUDService<TDto, TSearch, TInsert, TUpdate>,
        searchAttributes: string[],
        private insertAttributes: string[],
        private updateAttributes: string[]
    ) {
        super(service, searchAttributes);
    }

    async insert(req: Request, res: Response) {
        try {
            res.status(200).json(
                await (this.service as ICRUDService<TDto, TSearch, TInsert, TUpdate>).insert(
                    map(req.body, this.insertAttributes)
                )
            )
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            res.status(200).json(
                await (this.service as ICRUDService<TDto, TSearch, TInsert, TUpdate>).update(
                    +req.params.id,
                    map(req.body, this.updateAttributes)
                )
            )
        } catch(err: any) {
            if (err.errors)
                res.status(400).json({
                    errors: err.errors.map((errr: any) => errr.message)
                })
            else 
                res.status(400).json(err);
        }
    }

    override getRouter(): Router {
        this.router = super.getRouter();
        this.router.post('/', (req: Request, res: Response) => this.insert(req, res));
        this.router.put('/:id', (req: Request, res: Response) => this.update(req, res));
        return this.router;
    }
}
```
```
class BaseService<TDto, TSearch> implements IService<TDto, TSearch> {
    protected model: any;

    constructor(
        model: any,
        protected dtoParameters: string[]
    ) { this.model = model; }

    async get(obj: TSearch): Promise<TDto[]> {
       return (await this.model.findAll({ where: obj as any })).map((value: any) => map(value, this.dtoParameters));
    }

    async getById(id: number): Promise<TDto> {
        return map((await this.model.findByPk(id)), this.dtoParameters);
    }
}
```
```
class BaseCRUDService<TDto, TSearch, TInsert, TUpdate> extends BaseService<TDto, TSearch> implements ICRUDService<TDto, TSearch, TInsert, TUpdate> {
    constructor(
        model: any,
        dtoParameters: string[]
    ) { super(model, dtoParameters) }

    async insert(insert: TInsert): Promise<TDto> {
        return map(await this.model.create(insert as any), this.dtoParameters);
    }

    async update(id: number, update: TUpdate): Promise<TDto> {
        return map((await this.model.update(
            update as any,
            { where: { id: id } as any, returning: true }
        ))[1][0], this.dtoParameters);
    }

    async delete(id: number): Promise<string> {
        const destroyed = await this.model.destroy({ where: { id: id } as any });
        return `Successfully destroyed ${destroyed} resources`;
    }
}
```

You can see other classes and interfaces in codebase.

## Other important functionalities

Besided generic API, other important parts of the project are:
* Migration based database versioning - used for adding dummy data (seeds), or adding indexes / columns to database in production, without distorting already inserted data.
* Logging of errors and api calls - LOGS_PATH environment variable decides where are these log files going to be stored. These two enables us to have better understanding of
  exceptions when they occur in production, and they help us analyze efficiency and performance of our backend (api.log)
* Automated database backup - we used cron jobs in order to backup database to host machine. Exact folder is defined by BACKUP_PATH in main.env file. These backups are
  going to happen every day at 23:59 o'clock. They are very useful in order to search database products, to see on which day were they most popular, unpopular, etc. etc.

