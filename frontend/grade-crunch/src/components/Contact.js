import { useState } from 'react';
import { Send, CheckCircle, MessageSquare } from 'lucide-react';

function Contact(){
    //use states for the contact page
    const[formData, setFormData] = useState({
        name:'',
        email:'',
        subject: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //simulates form submission
        setIsSubmitted(true);
        //reset form after 3 seconds, given it was submitted previously
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    const isFormValid = formData.name && formData.email && formData.message;

    return(
        <div className="w-screen bg-gray-50">
            {/* Header Section */}
            <div className=" text-black py-16"
                style={{ 
                backgroundImage: "url('./images/background2.png')" 
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        We would love to hear from you! Send us a message and we will respond as soon as possible.
                    </p>
                </div>
            </div>

            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-2xl w-full">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                        <p className="text-gray-600">
                                            Thank you for your message. We will get back to you within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center space-x-3 mb-8">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <MessageSquare className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Full Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your full name"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email Address <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your email address"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    placeholder="What is this about?"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Message <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    placeholder="Tell us about your inquiry or suggestion ..."
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 resize-none"
                                                />
                                            </div>

                                            <button
                                                onClick={handleSubmit}
                                                disabled={!isFormValid}
                                                className="w-full bg-gradient-to-r from-blue-300 to-green-300 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-400 hover:to-green-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 flex items-center justify-center space-x-2"
                                            >
                                                <Send className="w-5 h-5" />
                                                <span>Send Message</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;