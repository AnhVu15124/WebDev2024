import {Link} from "react-router-dom";
import "../../styles/homepage-style.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="header">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="60" height="60" viewBox="0 0 60 60">
            <image href="data:image/png;base64,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" x="0" y="0" width="60" height="60"/>
        </svg>
        <div className="name">
          <h1>CollabNote</h1>
          <h2>Collaborative Note-Taking App</h2>
        </div>
      </div>

      <div className="body">

        <div className="description">
          <h1 className="title">
            Collaborative Note-Taking Made Easy
          </h1>
          <p>
            Create better notes easily and improve your work management flow.
          </p>
          <p>
            Collaborate and create anywhere, anytime.
          </p>
        </div>

        <div className="account">
          <div className="box">
            <h1>Get started</h1>
            <h2>It's completely free</h2>
            <div className="buttons">
              <Link to="/login" className="btn btn-primary">Sign In</Link>
              <Link to="/register" className="btn btn-secondary">Sign Up</Link>
            </div>
          </div>  
        </div>
      </div>

      <div className="whitebox"></div>

      <div className="function">
        <h1>Easy to keep track of projects, plans, and everything in between.</h1>
        <div className="function-box-1">
          <div>
            <div className="text">
              <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" height="40" viewBox="0 0 40 40">
                  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABMpJREFUeF7tmmtoHFUUx39nk9a2asEXUrFoTXdn89A2pEJ8tFIRpSpKFZRW8k20PlARLKKIfrAKFpGKWsVv0mBBqO8KRYzV+qpaWmO6O7uCYtXgC19Uq8nusTebBEt3bubuztbZzc6X/XLOvf/ff8+9c+fMCNP8kmnOT9OAZgVMcweaS2CaF0BzE2wugeYSqHcH8tpNkRNIsIek/OiKU79LwNcTgZeBc8eh/wEexpMHXEyoTwNUW/B5F+Gcw2CVPtKyKawJ9WmAr3cCjwZADuDJhY1rQF7bKPAZwpyykMou0tLTmAaoClm2keAiC+BjeGIqJNRVX0vA1+uBZy1k+ynSRbt8FYoe6ugkuFfn0coQynGBcMLtpOTxsPAmrn4qIKNbDt7rVwbCFfmINOchUmg8A3y9FtgcCKb8TQs9JGXIBb4+KiCj5pRnwE62lP59pORBV/j6MMDX54A+C9wgIyyhS8xJ0PmK9x7g6wpgq6X0C2OnQU8+diYfT4ivAXv0aGYxCCywGLCetKytFD7eS8DXJ4BbLHBfcoAzWST7G8+AvPZS4D2ERFk4RREuxpM3q4GPZwXk9ShG2UWCDkvpP0Na1lQLH08DfF0H3GOBG2YmHSyQXxvPgKyehfAJMMMCtxJPXooCPl4VMKCtnMKHQPCjbJHNtMuqqODjZYCvd4+1tIKvn5lBJ2fI941nQEZTCLsRZls2PqdWV1iT/v+DkGly5DC3M1sb6w08uTQslEucuwG+LqLIOhL0UGSYBBvxxNaksOvJ6hqEjZagP2ilizb52gUsbKybATltR9kJHHPIBMIGUnJH2Ekn4/J6KgWGEOZacm/Fkyedxw6Z4GZAVvsRVpcdW1hLStaHnLcU5uurwOWWnB2kuACRotO4DsFuBuR0EKWr7PhKEeE6PAluXPw3MaerUfotm94BhG48yTrwOIe6GZDR10hwmUW06cxcQlK2W5WU3upkAPMbdN2LJw85EzkmuBmQ02UUeRux9BKFXxDOJyl7A7XYlpJJUnYzzNksl1FHHudwNwNK6/b+gz/292/Kt7TQS1K+OUyRr+Z29rpF6ShFemmXT51pKkhwN8BMktOnUG6aYr5BWllKm/w2GZfXuRT4HGG+Jde84LQ9DFWAGZxSmQHm5WSeLShXTKHmLUZYMdmvy+rTCDdacnLMYTHz5a9IKS2DVWaAGTCrx6JsJ0G3VazQT5I+vmAZBQYC9w9zF0mwnJS8c6TgzTyVG2CyzduaFj4ATptCtHnIuRpIBcaZ02BKbj6S8NUbUNoPzOlwB3B8FeK/YyadUTU5XHRUVwETM/m6FGUbwiyXySdjlStJyysV5VaZFI0BpT3hGuD5wEZmsNBNeGJ78VEloj09OgNKy+EulEccFP9EC50slB8cciINjdaAUiVsQLgtpMpVoZ8dQg7oGha9AaoJcrwAXGUVo2wlLcHPFa4kFcZHb4ARsk9n8+dYl2fiE7ZD5Sm/jzU5Fsq+CnVHllYbA4y8vJ5EkfeBhWXU3lBVFyky/GoPQlMJyejpCC8iLB4PHRn/mNE8UMXiql0FTOCV9oQlKPMospMOGY4F+biI2hsQJ9oyWpoGxPwPqrm8ZgXU3OKYT9CsgJj/QTWX16yAmlsc8wmmfQX8Cx69K1Cn40UqAAAAAElFTkSuQmCC" width="40" height="40"/>
              </svg>
              <h2>Easy to create and delete notes, with no limit on the amount:</h2>
            </div>
            <p>Create as many notes as you need for your schedules, plans, and projects, </p>
            <p>ensuring that you can keep everything organized and easily accessible.</p>
            </div>
          </div>
        <div className="function-box-2">
          <div>
            <div className="text">
              <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" height="40" viewBox="0 0 40 40">
                  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABMpJREFUeF7tmmtoHFUUx39nk9a2asEXUrFoTXdn89A2pEJ8tFIRpSpKFZRW8k20PlARLKKIfrAKFpGKWsVv0mBBqO8KRYzV+qpaWmO6O7uCYtXgC19Uq8nusTebBEt3bubuztbZzc6X/XLOvf/ff8+9c+fMCNP8kmnOT9OAZgVMcweaS2CaF0BzE2wugeYSqHcH8tpNkRNIsIek/OiKU79LwNcTgZeBc8eh/wEexpMHXEyoTwNUW/B5F+Gcw2CVPtKyKawJ9WmAr3cCjwZADuDJhY1rQF7bKPAZwpyykMou0tLTmAaoClm2keAiC+BjeGIqJNRVX0vA1+uBZy1k+ynSRbt8FYoe6ugkuFfn0coQynGBcMLtpOTxsPAmrn4qIKNbDt7rVwbCFfmINOchUmg8A3y9FtgcCKb8TQs9JGXIBb4+KiCj5pRnwE62lP59pORBV/j6MMDX54A+C9wgIyyhS8xJ0PmK9x7g6wpgq6X0C2OnQU8+diYfT4ivAXv0aGYxCCywGLCetKytFD7eS8DXJ4BbLHBfcoAzWST7G8+AvPZS4D2ERFk4RREuxpM3q4GPZwXk9ShG2UWCDkvpP0Na1lQLH08DfF0H3GOBG2YmHSyQXxvPgKyehfAJMMMCtxJPXooCPl4VMKCtnMKHQPCjbJHNtMuqqODjZYCvd4+1tIKvn5lBJ2fI941nQEZTCLsRZls2PqdWV1iT/v+DkGly5DC3M1sb6w08uTQslEucuwG+LqLIOhL0UGSYBBvxxNaksOvJ6hqEjZagP2ilizb52gUsbKybATltR9kJHHPIBMIGUnJH2Ekn4/J6KgWGEOZacm/Fkyedxw6Z4GZAVvsRVpcdW1hLStaHnLcU5uurwOWWnB2kuACRotO4DsFuBuR0EKWr7PhKEeE6PAluXPw3MaerUfotm94BhG48yTrwOIe6GZDR10hwmUW06cxcQlK2W5WU3upkAPMbdN2LJw85EzkmuBmQ02UUeRux9BKFXxDOJyl7A7XYlpJJUnYzzNksl1FHHudwNwNK6/b+gz/292/Kt7TQS1K+OUyRr+Z29rpF6ShFemmXT51pKkhwN8BMktOnUG6aYr5BWllKm/w2GZfXuRT4HGG+Jde84LQ9DFWAGZxSmQHm5WSeLShXTKHmLUZYMdmvy+rTCDdacnLMYTHz5a9IKS2DVWaAGTCrx6JsJ0G3VazQT5I+vmAZBQYC9w9zF0mwnJS8c6TgzTyVG2CyzduaFj4ATptCtHnIuRpIBcaZ02BKbj6S8NUbUNoPzOlwB3B8FeK/YyadUTU5XHRUVwETM/m6FGUbwiyXySdjlStJyysV5VaZFI0BpT3hGuD5wEZmsNBNeGJ78VEloj09OgNKy+EulEccFP9EC50slB8cciINjdaAUiVsQLgtpMpVoZ8dQg7oGha9AaoJcrwAXGUVo2wlLcHPFa4kFcZHb4ARsk9n8+dYl2fiE7ZD5Sm/jzU5Fsq+CnVHllYbA4y8vJ5EkfeBhWXU3lBVFyky/GoPQlMJyejpCC8iLB4PHRn/mNE8UMXiql0FTOCV9oQlKPMospMOGY4F+biI2hsQJ9oyWpoGxPwPqrm8ZgXU3OKYT9CsgJj/QTWX16yAmlsc8wmmfQX8Cx69K1Cn40UqAAAAAElFTkSuQmCC" width="40" height="40"/>
              </svg>
              <h2>Create restricted or public notes with ease:</h2>  
            </div>
              <p>Create notes that can be either restricted for private use or public</p>
              <p> for sharing with anyone, all with just a few clicks.</p>
          </div>
        </div>
        <div className="function-box-3">
          <div>
            <div className="text">
              <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" height="40" viewBox="0 0 40 40">
                  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABMpJREFUeF7tmmtoHFUUx39nk9a2asEXUrFoTXdn89A2pEJ8tFIRpSpKFZRW8k20PlARLKKIfrAKFpGKWsVv0mBBqO8KRYzV+qpaWmO6O7uCYtXgC19Uq8nusTebBEt3bubuztbZzc6X/XLOvf/ff8+9c+fMCNP8kmnOT9OAZgVMcweaS2CaF0BzE2wugeYSqHcH8tpNkRNIsIek/OiKU79LwNcTgZeBc8eh/wEexpMHXEyoTwNUW/B5F+Gcw2CVPtKyKawJ9WmAr3cCjwZADuDJhY1rQF7bKPAZwpyykMou0tLTmAaoClm2keAiC+BjeGIqJNRVX0vA1+uBZy1k+ynSRbt8FYoe6ugkuFfn0coQynGBcMLtpOTxsPAmrn4qIKNbDt7rVwbCFfmINOchUmg8A3y9FtgcCKb8TQs9JGXIBb4+KiCj5pRnwE62lP59pORBV/j6MMDX54A+C9wgIyyhS8xJ0PmK9x7g6wpgq6X0C2OnQU8+diYfT4ivAXv0aGYxCCywGLCetKytFD7eS8DXJ4BbLHBfcoAzWST7G8+AvPZS4D2ERFk4RREuxpM3q4GPZwXk9ShG2UWCDkvpP0Na1lQLH08DfF0H3GOBG2YmHSyQXxvPgKyehfAJMMMCtxJPXooCPl4VMKCtnMKHQPCjbJHNtMuqqODjZYCvd4+1tIKvn5lBJ2fI941nQEZTCLsRZls2PqdWV1iT/v+DkGly5DC3M1sb6w08uTQslEucuwG+LqLIOhL0UGSYBBvxxNaksOvJ6hqEjZagP2ilizb52gUsbKybATltR9kJHHPIBMIGUnJH2Ekn4/J6KgWGEOZacm/Fkyedxw6Z4GZAVvsRVpcdW1hLStaHnLcU5uurwOWWnB2kuACRotO4DsFuBuR0EKWr7PhKEeE6PAluXPw3MaerUfotm94BhG48yTrwOIe6GZDR10hwmUW06cxcQlK2W5WU3upkAPMbdN2LJw85EzkmuBmQ02UUeRux9BKFXxDOJyl7A7XYlpJJUnYzzNksl1FHHudwNwNK6/b+gz/292/Kt7TQS1K+OUyRr+Z29rpF6ShFemmXT51pKkhwN8BMktOnUG6aYr5BWllKm/w2GZfXuRT4HGG+Jde84LQ9DFWAGZxSmQHm5WSeLShXTKHmLUZYMdmvy+rTCDdacnLMYTHz5a9IKS2DVWaAGTCrx6JsJ0G3VazQT5I+vmAZBQYC9w9zF0mwnJS8c6TgzTyVG2CyzduaFj4ATptCtHnIuRpIBcaZ02BKbj6S8NUbUNoPzOlwB3B8FeK/YyadUTU5XHRUVwETM/m6FGUbwiyXySdjlStJyysV5VaZFI0BpT3hGuD5wEZmsNBNeGJ78VEloj09OgNKy+EulEccFP9EC50slB8cciINjdaAUiVsQLgtpMpVoZ8dQg7oGha9AaoJcrwAXGUVo2wlLcHPFa4kFcZHb4ARsk9n8+dYl2fiE7ZD5Sm/jzU5Fsq+CnVHllYbA4y8vJ5EkfeBhWXU3lBVFyky/GoPQlMJyejpCC8iLB4PHRn/mNE8UMXiql0FTOCV9oQlKPMospMOGY4F+biI2hsQJ9oyWpoGxPwPqrm8ZgXU3OKYT9CsgJj/QTWX16yAmlsc8wmmfQX8Cx69K1Cn40UqAAAAAElFTkSuQmCC" width="40" height="40"/>
              </svg>
              <h2>No limit on the number of people you can share with:</h2>
            </div>
            <p>"Share your notes with as many people as you want"</p>
            <p>", with no limit on the number of collaborators."</p>
          </div>
        </div>
        <div className="function-box-4">
          <div>
            <div className="text">
              <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" height="40" viewBox="0 0 40 40">
                  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABMpJREFUeF7tmmtoHFUUx39nk9a2asEXUrFoTXdn89A2pEJ8tFIRpSpKFZRW8k20PlARLKKIfrAKFpGKWsVv0mBBqO8KRYzV+qpaWmO6O7uCYtXgC19Uq8nusTebBEt3bubuztbZzc6X/XLOvf/ff8+9c+fMCNP8kmnOT9OAZgVMcweaS2CaF0BzE2wugeYSqHcH8tpNkRNIsIek/OiKU79LwNcTgZeBc8eh/wEexpMHXEyoTwNUW/B5F+Gcw2CVPtKyKawJ9WmAr3cCjwZADuDJhY1rQF7bKPAZwpyykMou0tLTmAaoClm2keAiC+BjeGIqJNRVX0vA1+uBZy1k+ynSRbt8FYoe6ugkuFfn0coQynGBcMLtpOTxsPAmrn4qIKNbDt7rVwbCFfmINOchUmg8A3y9FtgcCKb8TQs9JGXIBb4+KiCj5pRnwE62lP59pORBV/j6MMDX54A+C9wgIyyhS8xJ0PmK9x7g6wpgq6X0C2OnQU8+diYfT4ivAXv0aGYxCCywGLCetKytFD7eS8DXJ4BbLHBfcoAzWST7G8+AvPZS4D2ERFk4RREuxpM3q4GPZwXk9ShG2UWCDkvpP0Na1lQLH08DfF0H3GOBG2YmHSyQXxvPgKyehfAJMMMCtxJPXooCPl4VMKCtnMKHQPCjbJHNtMuqqODjZYCvd4+1tIKvn5lBJ2fI941nQEZTCLsRZls2PqdWV1iT/v+DkGly5DC3M1sb6w08uTQslEucuwG+LqLIOhL0UGSYBBvxxNaksOvJ6hqEjZagP2ilizb52gUsbKybATltR9kJHHPIBMIGUnJH2Ekn4/J6KgWGEOZacm/Fkyedxw6Z4GZAVvsRVpcdW1hLStaHnLcU5uurwOWWnB2kuACRotO4DsFuBuR0EKWr7PhKEeE6PAluXPw3MaerUfotm94BhG48yTrwOIe6GZDR10hwmUW06cxcQlK2W5WU3upkAPMbdN2LJw85EzkmuBmQ02UUeRux9BKFXxDOJyl7A7XYlpJJUnYzzNksl1FHHudwNwNK6/b+gz/292/Kt7TQS1K+OUyRr+Z29rpF6ShFemmXT51pKkhwN8BMktOnUG6aYr5BWllKm/w2GZfXuRT4HGG+Jde84LQ9DFWAGZxSmQHm5WSeLShXTKHmLUZYMdmvy+rTCDdacnLMYTHz5a9IKS2DVWaAGTCrx6JsJ0G3VazQT5I+vmAZBQYC9w9zF0mwnJS8c6TgzTyVG2CyzduaFj4ATptCtHnIuRpIBcaZ02BKbj6S8NUbUNoPzOlwB3B8FeK/YyadUTU5XHRUVwETM/m6FGUbwiyXySdjlStJyysV5VaZFI0BpT3hGuD5wEZmsNBNeGJ78VEloj09OgNKy+EulEccFP9EC50slB8cciINjdaAUiVsQLgtpMpVoZ8dQg7oGha9AaoJcrwAXGUVo2wlLcHPFa4kFcZHb4ARsk9n8+dYl2fiE7ZD5Sm/jzU5Fsq+CnVHllYbA4y8vJ5EkfeBhWXU3lBVFyky/GoPQlMJyejpCC8iLB4PHRn/mNE8UMXiql0FTOCV9oQlKPMospMOGY4F+biI2hsQJ9oyWpoGxPwPqrm8ZgXU3OKYT9CsgJj/QTWX16yAmlsc8wmmfQX8Cx69K1Cn40UqAAAAAElFTkSuQmCC" width="40" height="40"/>
              </svg>
              <h2>Edit in real-time with others:</h2>
            </div>
            <p>Edit your notes in real-time with others anywhere, anytime</p>
            </div>
          </div>
        </div>

        <div className="privacy-security">
          <h1>Privacy & Security</h1>
          <h2>Privacy Commitment</h2>
          <p>
            We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data while using our services. By using our platform, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2>Information Collection</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> This includes your email address, and any other information you provide when you create an account or interact with our services.
            </li>
            <li>
              <strong>Usage Data:</strong> We automatically collect information about your interactions with our website, including your IP address, browser type, pages visited, and the time spent on each page.
            </li>
          </ul>

          <h2>Use of Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>
              <strong>To Provide and Maintain Our Service:</strong> Ensuring our platform functions effectively.
            </li>
            <li>
              <strong>To Notify You About Changes:</strong> Informing you about updates to our services or features.
            </li>
            <li>
              <strong>To Provide Customer Support:</strong> Assisting you with any inquiries or issues you may have.
            </li>
            <li>
              <strong>To Monitor Usage:</strong> Analyzing usage patterns to improve our platform.
            </li>
          </ul>
          <h2>Data Security</h2>
          <p>We take your data security seriously and implement various measures to protect your personal information, including:</p>
          <ul>
            <li>
              <strong>Encryption:</strong> We use encryption technologies to safeguard your data.
            </li>
            <li>
              <strong>Access Controls:</strong> Restricting access to your information to authorized personnel only.
            </li>
            <li>
              <strong>Regular Audits:</strong> Conducting regular security audits to ensure data protection.
            </li>
          </ul>
        </div>
        <div className="contact">
          <h1>Contact Us</h1>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
          <p>tunght.22bi13453@usth.edu.vn nguyentt.22bi13343@usth.edu.vn thanhdtt.22bi13406@usth.edu.vn vinhtt.22bi13474@usth.edu.vn vuta.22bi13482@usth.edu.vn</p>
        </div>
    </div>
  );
};

export default Homepage;
