import bcryptjs from 'bcryptjs'
const user=[
    {
        name:"Admin user",
        email:"Admin@gmail.com",
        password: bcryptjs.hashSync("12345",10),
        isAdmin:true
    },
    {
        name:"Asif",
        email:"Asif@gmail.com",
        password: bcryptjs.hashSync("12345",10),
        // isAdmin:true
    },
    {
        name:"imran",
        email:"imran@gmail.com",
        password: bcryptjs.hashSync("12345",10),
        // isAdmin:true
    },
    {
        name:"khasif",
        email:"khashif@gmail.com",
        password: bcryptjs.hashSync("12345",10),
        // isAdmin:true
    },
]
export default user