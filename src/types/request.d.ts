declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}

export type User = {
  userId:string, 
  role:string
}