import express, { Express } from 'express';
import morgan from 'morgan';
import { connectDB } from './database';
import { PORT } from './config'
import { routes } from './routes'
import cors from 'cors';


export class Server {
  private app: Express;

  constructor(){
    this.app = express();
    connectDB();
    this.configuration();
    this.middlewares();
    this.routes();
  }

  configuration(){
    this.app.set('port', PORT || 3000);
  }

  middlewares(){
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(){
    this.app.get('/', (req, res)=>{
      res.status(200).json({
        name:'API HACORP'
      })
    });

    this.app.use('/api/user', routes.UserRoute);
    this.app.use('/api/tdd', routes.TddRoute);
    this.app.use('/api/budget', routes.BudgetRoute);
    this.app.use('/api/category', routes.CategoryRoute);
    this.app.use('/api/transaction', routes.TransactionRoute);
  }

  listen(){
    this.app.listen(this.app.get('port'), ()=>{
      console.log(`Server running on port ${this.app.get('port')}`);      
    })
  }

}