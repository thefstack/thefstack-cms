'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Database,
  Server,
  GitBranch,
  Cloud
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code2 className="h-6 w-6" />,
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'Next.js', level: 87 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 90 },
      ],
    },
    {
      title: 'Backend Development',
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'REST APIs', level: 90 },
        { name: 'Serverless Functions', level: 80 },
        { name: 'Socket.io', level: 75 }
      ],
    },
    {
      title: 'Database & Cloud',
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'Firestore', level: 75 },
        { name: 'Firebase Hosting', level: 70 },
        { name: 'azure', level: 55 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: <GitBranch className="h-6 w-6" />,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Postman', level: 85 },
        { name: 'OpenAI API', level: 80 },
        { name: 'Context API', level: 85 },
        { name: 'Jira', level: 80 },
      ],
    },
  ];

  // Technologies derived directly from the resume (citations removed as they are not valid JS syntax)
  const technologies = [
    'JavaScript', 'React.js', 'Next.js', 'Node.js',
    'Express.js', 'MongoDB', 'MySQL', 'Git', 'Socket.io',
    'Postman', 'REST APIs', 'Context API',
    'OpenAI API', 'Serverless Functions', 'Jira'
  ];

  // Filter out duplicate technologies and ensure unique values for badges
  const uniqueTechnologies = Array.from(new Set(technologies));


  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web applications, with a focus on AI-powered solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <div className="text-primary">{category.icon}</div>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {uniqueTechnologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;