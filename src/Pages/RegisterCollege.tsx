import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Plus, X, Upload, Building, MapPin, Phone, Mail, Globe, FileText, ArrowLeft } from "lucide-react"

interface CollegeFormData {
  title: string
  subtitle: string
  shortDescription: string
  longDescription: string
  image: string
  establishedYear: string
  location: string
  phone: string
  email: string
  website: string
  type: string
  accreditation: string
  degrees: string[]
  links: Array<{
    label: string
    url: string
    type: "prospectus" | "website" | "other"
  }>
}

const RegisterCollege: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CollegeFormData>({
    title: '',
    subtitle: '',
    shortDescription: '',
    longDescription: '',
    image: '',
    establishedYear: '',
    location: '',
    phone: '',
    email: '',
    website: '',
    type: '',
    accreditation: '',
    degrees: [],
    links: []
  })

  const [currentDegree, setCurrentDegree] = useState('')
  const [currentLink, setCurrentLink] = useState({
    label: '',
    url: '',
    type: 'other' as const
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const collegeTypes = [
    'University',
    'College',
    'Institute',
    'Education Consultancy',
    'International School',
    'Technical College',
    'Community College'
  ]

  const accreditationBodies = [
    'HEC (Higher Education Commission)',
    'NCEAC (National Computing Education Accreditation Council)',
    'PEC (Pakistan Engineering Council)',
    'PMDC (Pakistan Medical Commission)',
    'International Accreditation',
    'Other'
  ]

  const handleInputChange = (field: keyof CollegeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addDegree = () => {
    if (currentDegree.trim() && !formData.degrees.includes(currentDegree.trim())) {
      setFormData(prev => ({
        ...prev,
        degrees: [...prev.degrees, currentDegree.trim()]
      }))
      setCurrentDegree('')
    }
  }

  const removeDegree = (index: number) => {
    setFormData(prev => ({
      ...prev,
      degrees: prev.degrees.filter((_, i) => i !== index)
    }))
  }

  const addLink = () => {
    if (currentLink.label.trim() && currentLink.url.trim()) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, { ...currentLink }]
      }))
      setCurrentLink({ label: '', url: '', type: 'other' })
    }
  }

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate slug from title
      const slug = generateSlug(formData.title)

      // Create college object
      const newCollege = {
        slug,
        ...formData,
        establishedYear: parseInt(formData.establishedYear) || new Date().getFullYear(),
        registeredAt: new Date().toISOString(),
        status: 'pending' // For admin approval
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In a real app, you'd send this to your backend
      console.log('Registering college:', newCollege)

      // Store in localStorage for demo (in real app, this would be handled by your state management)
      const existingColleges = JSON.parse(localStorage.getItem('registeredColleges') || '[]')
      existingColleges.push(newCollege)
      localStorage.setItem('registeredColleges', JSON.stringify(existingColleges))

      // Update super admin stats
      const currentStats = JSON.parse(localStorage.getItem('adminStats') || '{"totalColleges": 128, "pendingApprovals": 0, "totalDegrees": 542, "activeUsers": 3240}')
      currentStats.totalColleges += 1
      currentStats.pendingApprovals += 1
      localStorage.setItem('adminStats', JSON.stringify(currentStats))

      toast({
        title: "College Registered Successfully! 🎉",
        description: "Your college registration has been submitted for admin review.",
      })

      // Reset form
      setFormData({
        title: '',
        subtitle: '',
        shortDescription: '',
        longDescription: '',
        image: '',
        establishedYear: '',
        location: '',
        phone: '',
        email: '',
        website: '',
        type: '',
        accreditation: '',
        degrees: [],
        links: []
      })

      // Navigate to super admin or colleges page after successful registration
      setTimeout(() => {
        navigate('/super-admin')
      }, 2000)

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error registering your college. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/colleges')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Colleges
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Your College</h1>
            <p className="text-gray-600">Join our educational network and reach thousands of students</p>
            <p className="text-sm text-gray-500 mt-2">
              Logged in as: <span className="font-medium">M-SAMIULLAH786</span> |
              Current Time: <span className="font-medium">2025-08-22 10:19:41 UTC</span>
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Building className="h-6 w-6" />
              College Registration Form
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Basic Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    College Name *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. ABC University"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle" className="text-sm font-medium">
                    Tagline/Subtitle
                  </Label>
                  <Input
                    id="subtitle"
                    placeholder="e.g. Excellence in Education"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Institution Type *
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {collegeTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishedYear" className="text-sm font-medium">
                    Established Year *
                  </Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    placeholder="e.g. 2010"
                    value={formData.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Location/Address *
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g. Lahore, Punjab, Pakistan"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +92-xxx-xxxxxxx"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. info@college.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">
                      <Globe className="h-4 w-4 inline mr-1" />
                      Website URL
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="e.g. https://www.college.edu"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">About Your Institution</h3>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription" className="text-sm font-medium">
                    Short Description * (Max 150 characters)
                  </Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="Brief description of your college..."
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    maxLength={150}
                    required
                    rows={2}
                  />
                  <p className="text-xs text-gray-500">
                    {formData.shortDescription.length}/150 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription" className="text-sm font-medium">
                    Detailed Description *
                  </Label>
                  <Textarea
                    id="longDescription"
                    placeholder="Detailed description of your college, facilities, programs, and achievements..."
                    value={formData.longDescription}
                    onChange={(e) => handleInputChange('longDescription', e.target.value)}
                    required
                    rows={4}
                  />
                </div>
              </div>

              {/* Image and Accreditation */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium">
                    <Upload className="h-4 w-4 inline mr-1" />
                    College Image URL
                  </Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/college-image.jpg"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditation" className="text-sm font-medium">
                    Accreditation Body *
                  </Label>
                  <Select value={formData.accreditation} onValueChange={(value) => handleInputChange('accreditation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accreditation" />
                    </SelectTrigger>
                    <SelectContent>
                      {accreditationBodies.map(body => (
                        <SelectItem key={body} value={body}>{body}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Degrees Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Programs/Degrees Offered</h3>

                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. BS Computer Science"
                    value={currentDegree}
                    onChange={(e) => setCurrentDegree(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDegree())}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addDegree} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.degrees.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.degrees.map((degree, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {degree}
                        <button
                          type="button"
                          onClick={() => removeDegree(index)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Links Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Links
                </h3>

                <div className="grid gap-2 md:grid-cols-4">
                  <Input
                    placeholder="Link label"
                    value={currentLink.label}
                    onChange={(e) => setCurrentLink(prev => ({ ...prev, label: e.target.value }))}
                  />
                  <Input
                    placeholder="URL"
                    value={currentLink.url}
                    onChange={(e) => setCurrentLink(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <Select
                    value={currentLink.type}
                    onValueChange={(value: any) => setCurrentLink(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospectus">Prospectus</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addLink} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.links.length > 0 && (
                  <div className="space-y-2">
                    {formData.links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{link.label}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {link.type}
                          </Badge>
                          <p className="text-sm text-gray-600 truncate max-w-md">{link.url}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLink(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !formData.title || !formData.shortDescription || !formData.longDescription || !formData.location || !formData.email || !formData.type || !formData.accreditation}
                  className="px-8 py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Building className="h-5 w-5 mr-2" />
                      Register College
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

export default RegisterCollege