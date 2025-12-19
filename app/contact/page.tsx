"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: MapPin,
    title: "California Office",
    details: ["1650 Harbor Bay Parkway, Suite 220", "Alameda, CA 94502"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["Diego Alcala: (562)-704-9157", "Ali Darwish: (512)-581-1996"],
  },
  {
    icon: Mail,
    title: "Emails",
    details: [
      "david.Kiewlich@badasslabs.org",
      "dalcala@mbprocurement.com",
      "adarwish@mbprocurement.com",
    ],
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: `${formData.firstName}${
            formData.lastName ? " " + formData.lastName : ""
          }`,
          email: formData.email,
          message: formData.message,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setIsSubmitting(false);
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try emailing us directly. Sorry about that!",
      });
    }

    // Simulate form submission
    // const res = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    // if (!res.ok) {
    //   toast({
    //     title: "Something went wrong",
    //     description: "Please try again in a moment.",
    //   });
    //   setIsSubmitting(false);
    //   return;
    // }

    // toast({
    //   title: "Message sent!",
    //   description: "We'll get back to you as soon as possible.",
    // });

    // setFormData({ firstName: "", lastName: "", email: "", message: "" });
    // setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              We'd Love to <span className="text-accent">Hear From You</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We're here to answer your questions, listen to your suggestions,
              or help with your reservations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card rounded-2xl border border-border p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={5}
                      className="w-full resize-none"
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our processing of your
                    data in accordance with our Privacy Policy.
                  </p>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Get in touch
                </h2>
                <p className="text-muted-foreground text-lg">
                  We're here to answer your questions and listen to your
                  suggestions. Reach out to us through any of the following
                  channels.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4 p-6 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="font-semibold text-foreground mb-2">
                  Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  <strong>Michigan Office</strong> - We're expanding! Stay tuned
                  for our new location.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
