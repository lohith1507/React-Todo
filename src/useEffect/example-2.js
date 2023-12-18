import React, { useState, useEffect } from "react";


const URL = "https://jsonplaceholder.typicode.com/users";

const Index = () => {

    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({ status: false, msg: "" });

    const fetchUsersData = async (apiURL) => {
        setLoading(true);
        setIsError({status:false, msg:""});
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            setUsersData(data);
            setLoading(false);
            setIsError({status:false, msg:''});
            if (response.status === 404) {
                throw new Error("Data not found")
            }
        }
        catch(error){
            setLoading(false);
            setIsError({
                status:true,
                msg:error.message|| "Something went wrong, Please try again"
            });
        }
    };

    useEffect(() => {
        fetchUsersData(URL);
    }, []);

    if (loading){
        return (
        <div>
            <h3>Loading....</h3>
        </div>
        );
    }
    if (isError?.status){
        return (<div>
            <h3 style={{color:"red"}}>{isError?.msg}</h3>
        </div>)
    }

    return (
        <div>
            <h1>useEffect Example -1 </h1>
            <ul>
                {
                    usersData.map((eachUser) => {
                        const { name, email, id } = eachUser;
                        return (
                            <li key={id}>
                                <div>{name}</div>
                                <div>{email}</div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default Index;