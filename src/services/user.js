import axios from "../lib/axios";


// PROMISES
export const getUsers = () => {
    return axios.get('/users');
};

/*

{
    "success": true,
    "users": [
        {
            "_id": "95bf9709eaac49079b4465395500b45e",
            "firstName": "John",
            "lastName": "Doe",
            "type": "consumer",
            "email": "testing@novateva.com",
            "password": "$2b$04$6WuOEMikdwy1TowQm2M8veyVCwqfNmRRN9TkxbpAFOaHDc1iDFQzS",
            "createdAt": "2022-05-04T17:51:13.190Z",
            "updatedAt": "2022-05-04T17:51:13.190Z",
            "__v": 0
        },
        {
            "_id": "46e8a69a357e4ffb9b65a5c796a3df7c",
            "firstName": "maria",
            "lastName": "figueroa",
            "type": "consumer",
            "email": "mf@gmail.com",
            "password": "$2b$04$qDXfuXpDivvuXahXIOUkxOts5rzUZfuP9yQ6.m0CjjISLvfOWdAUe",
            "createdAt": "2022-05-09T20:43:11.700Z",
            "updatedAt": "2022-05-09T20:43:11.700Z",
            "__v": 0
        },
        ..................
    ],
}


await getUsers()

*/

export const getUser = (id) => {
    return axios.get(`/users/${id}`);
};


/*
{
    "success": true,
    "user": {
        "_id": "cb31ee81ed3b4c719c66345831d3c455",
        "firstName": "lolao",
        "lastName": "lele",
        "type": "consumer",
        "email": "loucg@novateva.com",
        "password": "$2b$04$3WGFiV8SIFOvHKAxMfDluO2PdOHbABYlTietgduEwR87HpCd6LzTm",
        "createdAt": "2022-06-03T02:57:52.032Z",
        "updatedAt": "2022-06-03T02:57:52.032Z",
        "__v": 0
    }
}

await getUser(id)
*/ 


export const createUser = (userBody) =>{
    return axios.post('/users',userBody)
}

/*
userBody =>
{
	"firstName": "xxyy",
	"lastName": "zzzz",
	"type": "consumer" ,
    "email": "testing1@novateva.com",
    "password": "123456"
}

Returns

 "success": true,
    "user": {
        "firstName": "xxyy",
        "lastName": "zzzz",
        "type": "consumer",
        "email": "testing1@novateva.com",
        "password": "$2b$04$162HHHHYFToGPVVmvqquqe.8wWekk6E0HbB0qKhMOVLCpFTMrUAwK",
        "_id": "cb174abc46f34772acb64859f1f2a574",
        "createdAt": "2022-06-13T20:23:55.696Z",
        "updatedAt": "2022-06-13T20:23:55.696Z",
        "__v": 0
    }


    await createUser(userBody)
*/

