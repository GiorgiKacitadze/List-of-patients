import {useState, useEffect} from "react";
import {Link} from "react-router-dom"; 
import axios from "axios"; 

export default function Users(){
    
    const [users, setUsers] = useState([]);   
    useEffect(()=>{
        getUsers();
    },[]);

    function getUsers(){
        axios.get("http://localhost/react_patients_api/").then(function(response){
            setUsers(response.data);
        });
    } 

    const deleteUser = (id) => { 
        if(window.confirm("გსურთ წაშლა?") === true){ 
            axios.post("http://localhost/react_patients_api/deletePatients/", {id:id}).then(function(response){
            console.log(response.data.message);
            alert(response.data.message);
            getUsers();
            });
        }
        
    }

    return (
        <div className="row">
            <div className="col-md-12" style={{padding:"10px"}}>
          <Link to="user/create" className="btn btn-success"><span className="glyphicon glyphicon-plus"></span> ახალი პაციენტის დამატება </Link>
            <h1>პაციენტთა სია</h1>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>პაციენტის სახელი და გვარი</th>
                        <th>დაბ. თარიღი</th>
                        <th>სქესი</th>
                        <th>მობ. ნომერი</th>
                        <th>მისამართი</th>
                        <th>ქმედება</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,key)=>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.fullname}</td>
                            <td>{user.date}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.city}</td>
                            <td style={{display:"flex",gap:"10px"}}>
                                <Link to={`/user/${user.id}/edit`} className="btn btn-primary"><span className="glyphicon glyphicon-pencil"></span> რედაქტირება </Link>  
                                <button onClick={()=>deleteUser(user.id)} className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span> წაშლა </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    )
}