function About(){
    return(
        <div className="bg-center w-screen"
             style={{ 
                backgroundImage: "url('./images/background2.png')" 
             }}
        >
            <div className="bg-white mx-60 text-center">
                <div className="py-5 px-8">
                    <h1 className="text-3xl font-bold pb-5">About Grade Crunch</h1>
                    <h2 className="text-2xl font-bold pb-3">Our Mission</h2>
                    <p className="pb-3">Grade Crunch is designed to help students take control of their academic success by providing a 
                        simple, accurate, and user-friendly tool for calculating course grades. We believe that transparency 
                        in grading helps students make informed decisions about their studies and academic goals</p>
                    <h2 className="text-2xl font-bold pb-3">What We Offer</h2>
                    <h3 className="text-xl font-bold pb-2">Comprehensive Grade Calculation</h3>
                    <div className="text-justify pl-40">
                        <ul>
                            <li>&#8226; 
                                <span className="font-bold"> Multiple Input Methods:</span> Enter grades as percentages, letter grades, or points</li>
                            <li>&#8226;
                                <span className="font-bold"> Weighted Calculations:</span> Accurately calculate final grades based on assignment weights</li>
                            <li>&#8226;
                                <span className="font-bold"> Real-time Results:</span> Instant grade calculations as you input your data</li>
                            <li className="pb-2">&#8226;
                                <span className="font-bold"> Visual Grade Scale:</span> Reference table showing letter grade to percentage conversions</li>
                        </ul>
                    </div>
                    <h3 className="text-xl font-bold pb-2">Key Features</h3>
                    <div className="text-justify pl-52">
                        <ul>
                            <li>&#8226; Clean, intuitive interface that works on desktop and mobile devices</li>
                            <li>&#8226; Support for unlimited assignments and categories</li>
                            <li>&#8226; Reset functionality to start fresh calculations</li>
                            <li className="pb-3">&#8226; No registration required - use immediately and anonymously</li>
                        </ul>
                    </div>
                    <h2 className="text-2xl font-bold pb-2">How It Works</h2>
                    <p className="pb-2">Our calculator uses weighted average formulas to determine your course grade:</p>
                    <div className="text-justify pl-40">
                        <ul>
                            <li>&#8226;
                                <span className="font-bold"> Enter Your Assignments:</span> Add assignments, names, grades, and their weights</li>
                            <li>&#8226;
                                <span className="font-bold"> Choose Grade Format:</span> Select from percentage, letter, or points-based grading</li>
                            <li>&#8226;
                                <span className="font-bold"> Calculate:</span> Get your current course grade instantly</li>
                            <li className="pb-3">&#8226;
                                <span className="font-bold"> Plan Ahead:</span> Use the results to understand what grades you need on future assignments</li>
                        </ul>
                    </div>
                    <h2 className="text-2xl font-bold pb-2">Target Audience</h2>
                    <p className="pb-2">This tool is perfect for:</p>
                    <div className="text-justify pl-64">
                        <ul>
                            <li>&#8226; Students tracking their progress in individual courses</li>
                            <li>&#8226; Parents helping their children understand grade calculations</li>
                            <li>&#8226; Educators demonstrating how final grades are computed</li>
                            <li className="pb-3">&#8226; Anyone wanting to understand weighted grade calculations</li>
                        </ul>
                    </div>
                    <h2 className="text-2xl font-bold pb-3">Privacy & Security</h2>
                    <div className="text-justify pl-48">
                        <ul>
                            <li>&#8226;
                                <span className="font-bold"> No Data Storage:</span> Your grade information is never saved or transmitted</li>
                            <li>&#8226;
                                <span className="font-bold"> Client-Side Processing:</span> All calculations happen locally in your browser</li>
                            <li>&#8226;
                                <span className="font-bold"> No Personal Information:</span> We do not collect names, emails, or any personal data</li>
                            <li className="pb-3">&#8226;
                                <span className="font-bold"> Anonymous Usage:</span> Use the calculator without creating accounts or logging in</li>
                        </ul>
                    </div>
                    <h2 className="text-2xl font-bold pb-3">Accuracy & Reliability</h2>
                    <div className="text-justify pl-64">
                        <ul>
                            <li>&#8226; Built using industry-standard calculation methods</li>
                            <li>&#8226; Thoroughly tested with various grading scenarios</li>
                            <li>&#8226; Follows common academic grading scales and conventions</li>
                            <li className="pb-3">&#8226; Regular updates to ensure continued accuracy</li>
                        </ul>
                    </div>
                    <h2 className="text-2xl font-bold pb-2">Getting Started</h2>
                    <p className="pb-2">Using Grade Crunch is simple:</p>
                    <div className="text-justify pl-80">
                        <ol className="list-decimal list-inside">
                            <li>Visit our calculator page</li>
                            <li>Enter your class name (optional)</li>
                            <li>Select your preferred grade input method</li>
                            <li>Add your assignments and grades</li>
                            <li className="pb-3">Click "Calculate" to see your results</li>
                        </ol>
                    </div>
                    <h2 className="text-2xl font-bold pb-3">Support & Feedback</h2>
                    <p className="pb-3">We're committed to providing the best possible experience. If you encounter any issues or have 
                        suggestions for improvement, please do not hesitate to reach out.
                    </p>
                    <h2 className="text-2xl font-bold pb-3">Technical Information</h2>
                    <div className="text-justify pl-40">
                        <ul>
                            <li>&#8226;
                                <span className="font-bold"> Browser Compatibility:</span> Works on all modern web browsers</li>
                            <li>&#8226;
                                <span className="font-bold"> Mobile Friendly:</span> Responsive design for smartphones and tablets</li>
                            <li>&#8226;
                                <span className="font-bold"> No Downloads Required:</span> Entirely web-based application</li>
                            <li>&#8226;
                                <span className="font-bold"> Regular Updates:</span> Continuously improved based on user feedback</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;