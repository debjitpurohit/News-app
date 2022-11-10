import React from 'react'

const Newsitem=(props)=> {
    let { title, description, imageurl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span className="badge rounded-pill bg-danger"> {source}
            </span>
          </div>
          <img src={!imageurl ? "https://images.hindustantimes.com/img/2022/11/09/1600x900/UKRAINE-RUSSIA-CONFLICT-WAR-12_1668008435324_1668008435324_1668008449753_1668008449753.jpg" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <p className="card-text">{!description ? "Made by Debjit Purohit a 2nd year btech student." : description}...</p>
            <p className="card-text "><small className="text-muted">~By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem
//class based hle this.props krte hbe nhle props krte hbe