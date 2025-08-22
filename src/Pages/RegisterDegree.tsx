import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, GraduationCap, Building, Calendar, User, BookOpen, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

const RegisterDegree = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    degree: '',
    college: '',
    year: '',
    duration: '',
    specialization: '',
    description: '',
    requirements: '',
    credits: '',
    department: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const degreeTypes = [
    'Bachelor of Science (BS)',
    'Bachelor of Arts (BA)',
    'Bachelor of Business Administration (BBA)',
    'Bachelor of Commerce (BCom)',
    'Bachelor of Engineering (BE)',
    'Bachelor of Technology (BTech)',
    'Master of Science (MS)',
    'Master of Arts (MA)',
    'Master of Business Administration (MBA)',
    'Doctor of Philosophy (PhD)',
    'Associate Degree',
    'Diploma',
    'Certificate Program'
  ]

  const departments = [
    'Computer Science',
    'Software Engineering',
    'Information Technology',
    'Artificial Intelligence',
    'Data Science',
    'Cybersecurity',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Economics',
    'Psychology',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create degree registration object
      const newDegree = {
        id: 'degree_' + Date.now(),
        ...formData,
        registeredAt: new Date().toISOString(),
        status: 'pending' as const,
        registeredBy: 'M-SAMIULLAH786'
      }

      // Store in localStorage
      const existingDegrees = JSON.parse(localStorage.getItem('registeredDegrees') || '[]')
      existingDegrees.push(newDegree)
      localStorage.setItem('registeredDegrees', JSON.stringify(existingDegrees))

      toast({
        title: "Degree Registered Successfully! 🎓",
        description: "Your degree registration has been submitted for admin review.",
      })

      // Reset form
      setFormData({
        degree: '',
        college: '',
        year: '',
        duration: '',
        specialization: '',
        description: '',
        requirements: '',
        credits: '',
        department: ''
      })

      // Navigate to super admin after success
      setTimeout(() => {
        navigate('/super-admin')
      }, 2000)

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error registering your degree. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/degrees')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Degrees
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Degree Program</h1>
            <p className="text-gray-600">Add a new degree program to our educational database</p>
            <p className="text-sm text-gray-500 mt-2">
              Current User: <span className="font-medium">M-SAMIULLAH786</span> |
              Date: <span className="font-medium">2025-08-22 13:01:08 UTC</span>
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
            <CardTitle className="flex items-center gap-2 text-xl">
              <GraduationCap className="h-6 w-6" />
              Degree Registration Form
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Basic Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-sm font-medium">
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    Degree Type *
                  </Label>
                  <Select value={formData.degree} onValueChange={(value) => handleInputChange('degree', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                    <SelectContent>
                      {degreeTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college" className="text-sm font-medium">
                    <Building className="h-4 w-4 inline mr-1" />
                    College/University *
                  </Label>
                  <Input
                    id="college"
                    placeholder="e.g. IPS University"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">
                    Department/Faculty *
                  </Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-sm font-medium">
                    Specialization/Major
                  </Label>
                  <Input
                    id="specialization"
                    placeholder="e.g. Machine Learning, Web Development"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Duration *
                  </Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 Year">1 Year</SelectItem>
                      <SelectItem value="2 Years">2 Years</SelectItem>
                      <SelectItem value="3 Years">3 Years</SelectItem>
                      <SelectItem value="4 Years">4 Years</SelectItem>
                      <SelectItem value="5 Years">5 Years</SelectItem>
                      <SelectItem value="6 Months">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credits" className="text-sm font-medium">
                    Total Credits
                  </Label>
                  <Input
                    id="credits"
                    type="number"
                    placeholder="e.g. 120"
                    value={formData.credits}
                    onChange={(e) => handleInputChange('credits', e.target.value)}
                    min="1"
                    max="300"
                  />
                </div>
              </div>

              {/* Program Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Program Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Program Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the degree program, its objectives, and what students will learn..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-sm font-medium">
                    Admission Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the admission requirements, prerequisites, minimum grades, entrance exams, etc..."
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Information Notice */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Registration Notice</p>
                  <p>
                    Your degree program registration will be reviewed by our academic team.
                    You will be notified once the review is complete. This process typically takes 2-3 business days.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !formData.degree || !formData.college || !formData.duration || !formData.description || !formData.department}
                  className="px-8 py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Register Degree Program
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterDegree