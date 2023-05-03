import React from 'react'
import { Button } from 'react-bootstrap'



const RecruiterMainPage = ({ handlelogout }) => {


  return (
    <>
      <section style={{ display: 'flex', justifyContent: 'center', borderStyle: 'solid' }}>
        <nav>
          <h2>Welcome User - this is the Header of RecruiterMainPage</h2>
          <Button onClick={handlelogout}>התנתק</Button>
        </nav>
      </section>




    </>
  )
}

export default RecruiterMainPage;