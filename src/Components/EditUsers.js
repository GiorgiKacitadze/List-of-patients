import {useState, useEffect} from "react"; 
import axios from "axios"; 
import {useParams} from "react-router-dom"; 

export default function CreateUsers(){ 

    const [inputs, setInputs] = useState([]);
    const [selectors, setSelectors] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        getUser();
    },[]);

    function getUser(){
        axios.get(`http://localhost/react_patients_api/getUser/`, {params:{id:`${id}`}}).then(function(response){
            console.log(response.data);
            setInputs(response.data);
            setSelectors(response.data);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        axios.post("http://localhost/react_patients_api/editPatients/", inputs,selectors)
            .then(function(response){
                console.log(response.data.message); 
                alert(response.data.message);
                window.location.href = "/";
            })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setInputs(values=>({...values, [name]:value}));
        setSelectors(values=>({...values, [name]:value}));
    }

    

    const [cities, setCities] = useState([]);
    useEffect(()=>{
        getCities();
    },[]);

    const [genders, setGenders] = useState([]);
    useEffect(()=>{
        getGenders();
    },[]);

    function getCities(){
        axios.get("http://localhost/react_patients_api/getCities/").then(function(response){
            setCities(response.data);
        }); 
    }

    function getGenders(){
        axios.get("http://localhost/react_patients_api/getGenders/").then(function(response){
            setGenders(response.data);
        });
    }

    return (
        <div className="row">
            <div className = "col-md-2"></div>
            <div className = "col-md-8">
                <h1>პაციენტის ინფორმაციის რედაქტირება</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={inputs.id} onChange={handleChange}/>
                    <div className="mb-3 col-6 ">
                        <label>სახელი</label>
                        <input type="text" className = "form-control" name="name" value={inputs.name} onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6">
                        <label>გვარი</label>
                        <input type="text" className = "form-control" name="lastname" value={inputs.lastname} onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6">
                        <label>დაბ.თარიღი</label>
                        <input type="date" className = "form-control" name="birthdate" value={inputs.birthdate} onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6">
                        <label>ტელ. ნომერი</label>
                        <input type="number" className = "form-control" name="phonenumber" value={inputs.phonenumber} onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6 selectorDiv">
                        <label>სქესი </label>
                        <select name="genderid" value={selectors.genderid} onChange={handleChange} className="selector">
                            <option value="">აირჩიეთ სქესი</option>
                            {genders.map((gender,key)=>
                                <option key={key} value={gender.id}>{gender.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="mb-3 col-6 selectorDiv" >
                        <label>ქალაქი </label>
                        <select name="cityid" value={selectors.cityid} onChange={handleChange} className="selector">
                            <option value="">აირჩიეთ ქალაქი</option>
                            {cities.map((city,key)=>
                                <option key={key} value={city.id}>{city.name}</option>
                            )} 
                        </select>
                    </div>

                    <div className="mb-3 col-6">
                        <button type="submit" className="btn btn-success">ცვლილების შენახვა</button>
                    </div>
                </form>
            </div> 
        </div>
    )

}