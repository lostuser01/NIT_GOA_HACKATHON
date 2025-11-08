"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, MapPin, ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ReportIssuePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    photo: null as File | null,
  });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success("Location captured successfully!");
        },
        (error) => {
          toast.error("Unable to get location. Please enable GPS.");
          console.error(error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB");
        return;
      }
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      toast.error("Please capture your location before submitting");
      return;
    }

    if (!formData.title || !formData.category || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("category", formData.category);
      submitData.append("description", formData.description);
      submitData.append("latitude", location.lat.toString());
      submitData.append("longitude", location.lng.toString());
      if (formData.photo) {
        submitData.append("photo", formData.photo);
      }

      // Simulate API call (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Issue reported successfully!");
      router.push("/map");
    } catch (error) {
      toast.error("Failed to report issue. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/map">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Map
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Report Civic Issue
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Help improve your community by reporting civic issues with description,
            photo, and live location.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              Fill in the details below. Fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Issue Title */}
              <div className="space-y-2">
                <Label htmlFor="issue-title">Issue Title *</Label>
                <Input
                  id="issue-title"
                  placeholder="e.g., Pothole on Main Street"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="bg-white dark:bg-black"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="bg-white dark:bg-black">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road">🛣️ Road & Infrastructure</SelectItem>
                    <SelectItem value="lighting">💡 Street Lighting</SelectItem>
                    <SelectItem value="sanitation">🗑️ Sanitation & Waste</SelectItem>
                    <SelectItem value="water">💧 Water Supply</SelectItem>
                    <SelectItem value="drainage">🌊 Drainage & Sewage</SelectItem>
                    <SelectItem value="parks">🌳 Parks & Green Spaces</SelectItem>
                    <SelectItem value="traffic">🚦 Traffic & Signals</SelectItem>
                    <SelectItem value="other">📋 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail... Include information like when you first noticed it, how severe it is, and any other relevant details."
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="bg-white dark:bg-black resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Minimum 20 characters ({formData.description.length}/20)
                </p>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo (Optional)</Label>
                <div className="mt-2">
                  {selectedImage ? (
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800">
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setSelectedImage(null);
                            setFormData({ ...formData, photo: null });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        Photo uploaded successfully
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="photo"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-12 h-12 mb-3 text-gray-400 dark:text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG or JPEG (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          id="photo"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Live Location *</Label>
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant={location ? "secondary" : "outline"}
                    className="w-full h-12"
                    onClick={getLocation}
                  >
                    <MapPin className="mr-2 size-5" />
                    {location
                      ? `Location Captured: ${location.lat.toFixed(
                          5
                        )}°, ${location.lng.toFixed(5)}°`
                      : "Capture Current Location"}
                  </Button>
                  {location && (
                    <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        Location captured successfully! Your GPS coordinates will be
                        attached to the report for precise tracking.
                      </AlertDescription>
                    </Alert>
                  )}
                  {!location && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      We need your location to help authorities identify and resolve the
                      issue quickly.
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  disabled={isSubmitting || !location}
                >
                  {isSubmitting ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-pulse" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>

              {/* Helper Text */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
                By submitting this report, you agree to our terms of service and
                privacy policy. Your report will be reviewed by municipal authorities.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your report will be reviewed by authorities within 24-48 hours.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Monitor your issue status in real-time on the map and dashboard.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Help improve your neighborhood and make a difference together.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
