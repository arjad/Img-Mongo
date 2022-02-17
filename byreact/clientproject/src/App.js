import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';


function App() 
{
  const [singleFiles, setSingleFiles] = useState([]);

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
    } 
    catch (error) 
    {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleFileslist();
  }, []);


  ///select file
  const [singleFile, setSingleFile] = useState('');

  const SingleFileChange = (e) => {
      setSingleFile(e.target.files[0]);
  }

  //upload file
  const uploadSingleFile = async () => {
      const formData = new FormData();
      formData.append('file', singleFile);

      try {
        await axios.post('http://localhost:8080/api/singleFile', formData);
      } 
      catch (error) 
      {
        throw error;
      }
      console.log("sent file = ", singleFile);

  }

  //upload file


//show all files from db
  const getSingleFiles = async () => {
    try {
        const {data} = await axios.get('http://localhost:8080/api/read');
        return data;
    } 
    catch (error) 
    {
        throw error;
    }
  }
  
  return (
    <>
    <div className="container">
      <h3 className="text-danger font-weight-bolder m-4 text-center">
        Title :  File Upload Using MERN Stack 
      </h3>

      {/* form to upload */}
        <div className="form-group">
          <label>Select Image : </label>
          <input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
        </div>
        <div className="form-group">
            <button type="button" className="form-control btn btn-danger" onClick={() => uploadSingleFile()} >
                Upload
            </button>
        </div>
       
    </div>



    <div className="container mt-5">
      <h4 className="text-success font-weight-bold">Single Files List</h4>

        {singleFiles.map((file, index) => 
            <div className="card m-2 border-0 p-0">
              <p>{index} - {file.fileName}</p>
              <img src={`http://localhost:8080/${file.filePath}`} className="card-img-top" alt="img"/>
            </div>
        )}
      </div>
    </>
  );
}

export default App;
