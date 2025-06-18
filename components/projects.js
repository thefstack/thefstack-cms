'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Live AI Mock Interview System',
      description: 'Developed a cutting-edge 1-on-1 live AI mock interview platform. The system dynamically conducts interviews based on specific job descriptions and job titles, providing instant, personalized feedback on performance, communication, and technical answers.',
      image: 'https://images.pexels.com/photos/3760065/pexels-photo-3760065.jpeg?auto=compress&cs=tinysrgb&w=800', // Placeholder for interview/AI
      technologies: ['OpenAI API', 'Node.js', 'Next.js', 'WebRTC', 'React.js'], // Implied technologies + WebRTC for live interaction
      liveUrl: 'https://prepai.ivyproschool.com', // Part of prepai
      githubUrl: '#', // Not specified
      featured: true,
    },
    {
      title: 'Resume Optimizer & ATS Checker (AI-powered)',
      description: 'Engineered an AI-driven system to optimize resumes and perform ATS (Applicant Tracking System) checks. Users receive real-time feedback and suggestions to improve their resume’s compatibility and impact, enhancing job application success rates.',
      image: 'https://images.pexels.com/photos/6256038/pexels-photo-6256038.jpeg?auto=compress&cs=tinysrgb&w=800', // Placeholder image for resume/AI
      technologies: ['OpenAI API', 'Node.js', 'Next.js', 'React.js'], // Implied technologies
      liveUrl: 'https://prepai.ivyproschool.com', // Part of prepai
      githubUrl: '#', // Not specified
      featured: true,
    },
    {
      title: 'AI-Generated Quizzing System',
      description: 'Implemented backend logic to dynamically generate 10 MCQ questions using the OpenAI API. Built an AI-powered feedback module that analyzes user performance, identifies strengths/weaknesses, and suggests personalized learning paths. Enabled quiz generation from uploaded documents.',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800', // Placeholder image for AI quiz
      technologies: ['OpenAI API', 'Node.js', 'Next.js'], // Implied technologies
      liveUrl: 'https://prepai.ivyproschool.com', // From resume work experience
      githubUrl: '#', // Not specified in resume
      featured: true,
    },
    {
      title: 'AI Chatbot System',
      description: 'Developed the backend using Node.js, Next.js (serverless functions), and OpenAI API to build an intelligent chatbot. Enabled file-based question answering from uploaded documents and institutional content, integrating domain-specific conversation flows.',
      image: 'https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=800', // Placeholder image for AI
      technologies: ['Node.js', 'Next.js', 'OpenAI API', 'Serverless Functions'],
      liveUrl: 'https://prepai.ivyproschool.com', // From resume work experience
      githubUrl: '#', // Not specified in resume
      featured: true,
    },
    {
      title: 'Lesson Planning Module',
      description: 'Developed both frontend and backend functionalities for structured lesson planning within an AI-powered learning platform. Users can generate study plans and access curated educational content.',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800', // Placeholder image for planning
      technologies: ['React.js', 'Next.js', 'Node.js', 'MongoDB'], // Implied technologies
      liveUrl: 'https://prepai.ivyproschool.com', // From resume work experience
      githubUrl: '#', // Not specified in resume
      featured: true,
    },
    {
      title: 'PDF Splitter Web App',
      description: 'Built a fully client-side PDF splitter tool using React and PDF-lib, ensuring fast performance and complete user privacy (no file uploads to a server). Enables users to split PDF files by page range or file size.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800', // Placeholder image for PDF
      technologies: ['React.js', 'PDF-lib', 'HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://pdf-splitter.thefstack.com',
      githubUrl: '#', // Not explicitly provided for this project in resume
      featured: false,
    },
    {
      title: 'Digital E-Gram Panchayat',
      description: 'Implemented secure user authentication using Firebase Authentication. Built a service application system enabling users to apply for local government services. Developed an admin panel for service management, staff control, and application tracking.',
      image: 'https://images.pexels.com/photos/704767/pexels-photo-704767.jpeg?auto=compress&cs=tinysrgb&w=800', // Placeholder image for government/digital
      technologies: ['Firebase Authentication', 'Firestore', 'Firebase Hosting', 'React.js', 'Node.js', 'MySQL'], // Combined from resume details
      liveUrl: '#', // Not explicitly provided in resume, only GitHub
      githubUrl: 'https://github.com/thefstack/e-gram-panchayat',
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            My Recent <span className="text-primary">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of key projects and contributions from my professional experience and personal development
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-8 text-center">Key Professional Contributions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 text-white">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <div className="flex space-x-2">
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <Button size="icon" variant="ghost" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <Button size="icon" variant="ghost" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="px-2">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center">Independent Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {project.title}
                      <div className="flex space-x-1">
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <Button size="icon" variant="ghost" className="h-6 w-6" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <Button size="icon" variant="ghost" className="h-6 w-6" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs px-2">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;