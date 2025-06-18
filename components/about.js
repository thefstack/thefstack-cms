'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Award } from 'lucide-react'; // Changed Calendar to Award

const About = () => {
  const stats = [
    { label: 'Years Experience', value: '1+' }, // Adjusted based on resume start date
    { label: 'Projects Completed', value: '3+' }, // Counted specific projects from resume
    { label: 'AI Integrations', value: '5+' }, // New stat based on AI focus
    { label: 'Technologies', value: '15+' }, // Kept 15+ as a conservative estimate, could be 20+
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A dedicated Full Stack Developer passionate about leveraging technology to create impactful and intelligent solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <User className="h-5 w-5 text-primary" />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Kolkata, India</span> 
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Award className="h-5 w-5 text-primary" /> {/* Changed icon here */}
                <span>Open to new collaborations</span> {/* Changed text here */}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a Full Stack Developer at Ivy Knowledge Services Pvt. Ltd. since September 2024, I've been actively contributing to an AI-powered learning platform focused on enhancing student experiences. My work primarily involves backend development and seamless AI integration across core modules. I have hands-on experience with Node.js, Next.js, React, MongoDB, and the OpenAI API, developing features like intelligent chatbots, AI-generated quizzing systems, and comprehensive lesson planning tools. 
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I thrive on building robust and scalable applications, with a strong focus on both backend logic and dynamic frontend functionalities. Beyond my professional role, I've developed independent projects like a client-side PDF splitter and a digital E-Gram Panchayat system, showcasing my versatility and problem-solving skills.  My approach emphasizes progressive learning, engagement, and leveraging cutting-edge technologies to deliver exceptional digital experiences.
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className='px-2'>Problem-solving</Badge> 
                <Badge variant="secondary" className='px-2'>Team Collaboration</Badge> 
                <Badge variant="secondary" className='px-2'>AI Integration</Badge>
                <Badge variant="secondary" className='px-2'>Full Stack</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;