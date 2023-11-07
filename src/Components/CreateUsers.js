import {useState, useEffect} from "react"; 
import axios from "axios"; 
import {useNavigate} from "react-router-dom";

export default function CreateUsers(){ 

    const [inputs, setInputs] = useState([]);
    const [selectors, setSelectors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setInputs(values=>({...values, [name]:value}));
        setSelectors(values=>({...values, [name]:value}));
    }

    const handleSubmit = (event) => {
        if(inputs.name === undefined){ 
            alert("სახელი ცარიელია");
            event.preventDefault();
        }else if(inputs.lastname === undefined){
            alert("გვარი ცარიელია");
            event.preventDefault();
        }else if(inputs.birthdate === undefined){
            alert("დაბ.თარიღი ცარიელია");
            event.preventDefault();
        }else if(inputs.phonenumber === undefined){
            alert("ტელ. ნომერი ცარიელია");
            event.preventDefault();
        }else if(selectors.genderid === undefined){
            alert("აირჩიეთ სქესი");
            event.preventDefault();
        }else if(selectors.cityid === undefined){ 
            alert("აირჩიეთ ქალაქი");
            event.preventDefault();
        }else{
            event.preventDefault(); 
            axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
            axios.post("http://localhost/react_patients_api/createPatients/", inputs,selectors)
                .then(function(response){
                    console.log(response.data.message); 
                    alert(response.data.message);
                    navigate("/");
                }) 
        }
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
                <h1>პაციენტის ინფორმაციის დამატება</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 col-6">
                        <label>სახელი</label>
                        <input type="text" className = "form-control" name="name" onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6">
                        <label>გვარი</label>
                        <input type="text" className = "form-control" name="lastname" onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6">
                        <label>დაბ.თარიღი</label>
                        <input type="date" className = "form-control" name="birthdate" onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6">
                        <label>ტელ. ნომერი</label>
                        <input type="number" className = "form-control" name="phonenumber" onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-6 selectorDiv">
                        <label>სქესი </label>
                        <select name="genderid" onChange={handleChange} className="selector">
                            <option value="">აირჩიეთ სქესი</option>
                            {genders.map((gender,key)=>
                                <option key={key} value={gender.id}>{gender.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="mb-3 col-6 selectorDiv">
                        <label>ქალაქი </label>
                        <select name="cityid" onChange={handleChange} className="selector">
                            <option value="">აირჩიეთ ქალაქი</option>
                            {cities.map((city,key)=>
                                <option key={key} value={city.id}>{city.name}</option>
                            )} 
                        </select>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-success">დამატება</button>
                    </div>
                </form>
            </div> 
        </div>
    )

}