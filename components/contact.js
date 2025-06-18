'use client';

import { useState, useEffect } from 'react'; // Import useEffect for auto-hide
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, Github, Linkedin, XCircle, CheckCircle } from 'lucide-react'; // Added XCircle and CheckCircle for icons

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState(''); // 'success' or 'error'

    // Effect to auto-hide the pop-up after a few seconds
    useEffect(() => {
        let timer;
        if (showPopup) {
            timer = setTimeout(() => {
                setShowPopup(false);
            }, 5000); // Hide after 5 seconds
        }
        return () => clearTimeout(timer); // Clear timeout if component unmounts or showPopup changes
    }, [showPopup]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const displayPopup = (message, type) => {
        setPopupMessage(message);
        setPopupType(type);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
        setPopupType('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        closePopup(); // Close any existing pop-up before new submission

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                displayPopup(result.message || "Message sent successfully!", 'success');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); // Reset form
            } else {
                displayPopup(result.message || "Failed to send message. Please try again.", 'error');
            }
        } catch (error) {
            console.error("Frontend: Error sending message:", error);
            displayPopup("Network error or unexpected issue. Please try again later.", 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="h-5 w-5" />,
            label: 'Email',
            value: 'rajsharmahwh19@gmail.com',
            href: 'mailto:rajsharmahwh19@gmail.com',
        },
        {
            icon: <Phone className="h-5 w-5" />,
            label: 'Phone',
            value: '+91 9142892678',
            href: 'tel:+919142892678',
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            label: 'Location',
            value: 'Kolkata, India',
            href: 'https://www.google.com/maps/search/Kolkata,+India',
        },
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            icon: <Github className="h-5 w-5" />,
            href: 'https://github.com/thefstack',
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin className="h-5 w-5" />,
            href: 'https://linkedin.com/in/thefstack',
        },
    ];

    return (
        <section id="contact" className="py-20 bg-muted/30 relative"> {/* Added relative for pop-up positioning */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Get In <span className="text-primary">Touch</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Let's Talk</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                I'm always interested in hearing about new opportunities and exciting projects.
                                Whether you have a question about my work, want to collaborate, or just want to say hi,
                                feel free to reach out.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-background transition-colors duration-200"
                                >
                                    <div className="text-primary">{info.icon}</div>
                                    <div>
                                        <div className="font-medium">{info.label}</div>
                                        <div className="text-muted-foreground">{info.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send Me a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and I'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone Input Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone (Optional)</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Your phone number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Tell me about your project..."
                                        rows={5}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full text-[#777777] flex"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Custom Pop-up */}
            {showPopup && (
                <div
                    className={`fixed top-5 left-1/2 -translate-x-1/2 p-4 rounded-md shadow-lg flex items-center space-x-3 transition-all duration-300 z-50
                    ${popupType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    role="alert"
                >
                    {popupType === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <span className="font-medium">{popupMessage}</span>
                    <button
                        onClick={closePopup}
                        className="ml-auto text-white hover:text-gray-200 focus:outline-none"
                        aria-label="Close"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
};

export default Contact;