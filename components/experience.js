'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Full Stack Associate',
      company: 'Ivy Knowledge Services Pvt. Ltd. (prepai.ivyproschool.com)',
      location: 'Kolkata, India', // This implies in-office presence
      period: 'April 2025 - Present',
      type: 'Full-time',
      description: [
        'Led the completion and launch of the AI-powered Resume Builder, integrating real-time scoring and AI-based review features.',
        'Spearheaded the development and implementation of the 1-on-1 Live AI Mock Interview system, providing dynamic interview scenarios and personalized feedback.',
        'Developed the AI-powered "Resume Coach" feature, a specialized chatbot designed to guide users through resume optimization and career advice.',
        'Actively involved in optimizing existing AI integrations and implementing new cutting-edge features across the platform.',
        'Collaborate with cross-functional teams to design scalable solutions and improve system performance.',
      ],
      technologies: ['Node.js', 'Next.js', 'React.js', 'OpenAI API', 'MongoDB', 'Serverless Functions', 'REST APIs', 'Git', 'Postman', "Socket.io", "Express.js"],
    },
    {
      title: 'Full Stack Intern',
      company: 'Ivy Knowledge Services Pvt. Ltd. (prepai.ivyproschool.com)',
      location: 'Kolkata, India (Remote)', // Explicitly stating remote work
      period: 'Sep 2024 - April 2025',
      type: 'Full-time',
      description: [
        'Developed the backend for an AI-powered chatbot system using Node.js, Next.js (serverless functions), and OpenAI API, enabling file-based Q&A.',
        'Implemented the core logic for an AI-generated quizzing system to dynamically generate MCQs and provide personalized feedback from OpenAI API.',
        'Contributed to the development of a Lesson Planning Module, handling both frontend and backend functionalities for study plan generation.',
        'Initiated and developed a significant portion of the AI-driven Resume Optimizer and ATS Checker, laying the groundwork for its completion.',
      ],
      technologies: ['Node.js', 'Next.js', 'React.js', 'OpenAI API', 'MongoDB', 'Serverless Functions', 'REST APIs', 'Git', 'Postman'],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I've made
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Subtle timeline line - only visible on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-30"></div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot - enhanced for desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-md z-10"></div>

                  {/* Mobile timeline indicator */}
                  <div className="md:hidden absolute left-4 w-2 h-2 bg-primary rounded-full mt-6"></div>

                  <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-8'}`}>
                    <Card className={`${index % 2 === 0 ? 'md:mr-8' : ''} hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/50 md:border-l-0 md:border-2 md:hover:border-primary/30`}>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                            <CardTitle className="text-xl text-primary">{exp.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Building className="h-4 w-4" />
                              {exp.company}
                            </CardDescription>
                          </div>
                          <div className={`flex flex-col gap-1 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                            <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20 px-2">
                              {exp.type}
                            </Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {exp.period}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {exp.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-4 text-left">
                          {exp.description.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-muted-foreground flex items-start">
                              <span className="text-primary mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-current flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200 px-2">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;