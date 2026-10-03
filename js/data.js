// CYMOR Super Speciality Dental Clinic Data Source

const CYMOR_DATA = {
  clinicInfo: {
    name: "CYMOR Super Speciality Dental Clinic",
    tagline: "Confident Smiles. Expert Dental Care.",
    established: 2002,
    emergencyPhone: "+919995268787",
    landlinePhone: "04952665366",
    whatsappNumber: "919995268787",
    email: "cymordental@gmail.com",
    flagshipAddress: "Marva Building, Near AV Higher Secondary School, Ponnani, Malappuram - 679577, Kerala",
    mapUrl: "https://maps.google.com/?q=CYMOR+Dental+Clinic+Ponnani"
  },

  branches: [
    {
      id: "ponnani",
      name: "Ponnani Flagship Clinic",
      badge: "Main Super Speciality Centre",
      address: "Marva Building, Near AV Higher Secondary School, Ponnani, Malappuram - 679577",
      phone: "+91 73807 74477 / 0495 2665366",
      timings: "Mon - Sat: 9:00 AM - 7:00 PM (Sun: Emergency)",
      mapEmbed: "https://maps.google.com/?q=CYMOR+Dental+Clinic+Ponnani",
      facilities: ["3D Digital Scanner", "Class-B Autoclave", "Microscopic Endodontics", "Implant Surgical Suite"]
    },
    {
      id: "purangu",
      name: "Purangu Branch",
      badge: "Branch Clinic",
      address: "Main Road Junction, Near Juma Masjid, Purangu, Kerala",
      phone: "+91 73807 74477",
      timings: "Mon - Sat: 9:30 AM - 6:30 PM",
      mapEmbed: "https://maps.google.com/?q=Purangu+Kerala",
      facilities: ["Digital Radiography", "Routine & Preventive Dentistry", "Orthodontic Aligners"]
    },
    {
      id: "naripparambu",
      name: "Naripparambu Branch",
      badge: "Branch Clinic",
      address: "City Centre Complex, Naripparambu, Malappuram, Kerala",
      phone: "+91 73807 74477",
      timings: "Mon - Sat: 9:30 AM - 6:30 PM",
      mapEmbed: "https://maps.google.com/?q=Naripparambu+Kerala",
      facilities: ["Crown & Bridge Prosthetics", "Cosmetic Dentistry", "Dental X-Ray"]
    },
    {
      id: "andhetode",
      name: "ANDHETODE BRANCH",
      badge: "Branch Clinic",
      address: "AK COMPLEX, Andhetode, Kerala",
      phone: "+91 73807 74477",
      timings: "Mon - Sat: 10:00 AM - 6:00 PM",
      mapEmbed: "https://maps.google.com/?q=AK+COMPLEX+Andhetode+Kerala",
      facilities: ["Family Dental Care", "Emergency Triage", "Teeth Whitening"]
    }
  ],

  doctors: [
    {
      id: "dr-nazeer",
      name: "Dr. Nazeer P. Chittayil",
      qualification: "BDS (GDC Calicut), MDS (Orthodontics), CLO",
      role: "Founder & Chief Orthodontist",
      specialties: ["Orthodontist", "Growth Modulation Specialist", "Implantologist"],
      regNo: "4859",
      experience: "22+ Years Experience",
      image: "images/dr-nazeer.png",
      bio: "Dr. Nazeer founded CYMOR Dental Clinic in April 2002. Over two decades, he has transformed more than 5,000+ smiles with specialized digital orthodontic techniques, clear aligners, self-ligating braces, and orthopaedic growth modulation.",
      availability: "Monday to Saturday (Ponnani Flagship)",
      treatmentKey: "orthodontics"
    },
    {
      id: "dr-shalina",
      name: "Dr. Shalina Nazeer",
      qualification: "BDS",
      role: "Dental Surgeon",
      specialties: ["General Dental Surgery", "Preventive & Family Care", "Restorative Aesthetics"],
      regNo: "5610",
      experience: "Dental Surgeon",
      image: "images/doctors/dr-shalina.jpg",
      bio: "Dr. Shalina Nazeer provides comprehensive dental surgery, restorative solutions, and preventive dental care with a gentle, patient-focused approach for the whole family.",
      availability: "Monday to Saturday",
      treatmentKey: "general"
    },
    {
      id: "dr-akthar",
      name: "Dr. Mohamed Akthar Hashim",
      qualification: "Bachelor of Dental Surgery (BDS)",
      role: "Dental Surgeon",
      regNo: "28600",
      experience: "Dental Surgeon",
      image: "images/doctors/dr-akthar.jpg",
      availability: "Monday to Saturday",
      treatmentKey: "general",
      qualificationsList: [
        {
          degree: "Bachelor of Dental Surgery (BDS)",
          institution: "Government Dental College, Kottayam",
          university: "KUHS University"
        }
      ],
      professionalExperience: [
        {
          title: "Compulsory Rotatory Resident Internship",
          details: "Government Dental College, Kottayam",
          duration: "20 April 2020 – 20 April 2021"
        },
        {
          title: "Non-Academic Junior Resident",
          details: "Government Dental College and Medical College, Kottayam",
          duration: "3 months after internship"
        },
        {
          title: "CHC/PHC, Ettumanoor, Kottayam",
          details: "",
          duration: "1 month"
        },
        {
          title: "ABS Dental Clinic and Implant Center",
          details: "Kooroppada, Kottayam",
          duration: ""
        },
        {
          title: "Cheruvil Speciality Dental Care",
          details: "Ettumanoor, Kottayam",
          duration: ""
        },
        {
          title: "Perfect Smile Dental Clinic",
          details: "Pallickathodu, Kottayam",
          duration: ""
        }
      ],
      clinicalExperience: [
        "250+ tooth extractions, including third molars",
        "Assisted in 20+ impaction cases",
        "Anterior composite restorations",
        "Anterior RCT cases",
        "Amalgam and GIC restorations",
        "Complete denture cases",
        "Removable partial denture (RPD) cases",
        "Removable orthodontic appliances",
        "Scaling and root planing",
        "Pediatric dental management",
        "Diagnosis of oral lesions",
        "Dental emergency and trauma management",
        "Intraoral and extraoral suturing"
      ],
      bio: "Bachelor of Dental Surgery (BDS) from Government Dental College, Kottayam (KUHS University). Dedicated Dental Surgeon with hospital residency, primary health center, and clinical dental care experience."
    },
    {
      id: "dr-favas",
      name: "Dr. Muhammed Favas P.V.",
      qualification: "BDS",
      role: "Dental Surgeon",
      specialties: ["Aesthetic Restorations", "Routine Extractions", "Preventive Dentistry"],
      regNo: "32061",
      experience: "Dental Surgeon",
      image: "images/doctors/dr-favas.jpg",
      bio: "Dr. Muhammed Favas P.V. specializes in modern aesthetic tooth fillings, periodontal maintenance, and compassionate general dental surgery.",
      availability: "Monday to Saturday",
      treatmentKey: "general"
    },
    {
      id: "dr-arya",
      name: "Dr. Arya Krishna K.",
      qualification: "BDS",
      role: "Dental Surgeon",
      specialties: ["Pediatric Oral Care", "Cosmetic Fillings", "Preventive Care"],
      regNo: "21240",
      experience: "Dental Surgeon",
      image: "images/doctors/dr-arya.jpg",
      bio: "Dr. Arya Krishna K. focuses on preventive dental treatments, cavity management, and pediatric oral health in a comfortable, relaxing clinical environment.",
      availability: "Monday to Saturday",
      treatmentKey: "general"
    },
    {
      id: "dr-sarath",
      name: "Dr. Sarath Gopinath",
      qualification: "MDS",
      role: "Consultant Endodontist",
      specialties: ["Microscopic Root Canal Therapy", "Single-Sitting RCT", "Endodontic Retreatment"],
      regNo: "7488",
      experience: "Consultant Endodontist",
      image: "images/doctors/dr-sarath.jpg",
      bio: "A master in painless root canal treatments, Dr. Sarath Gopinath utilizes operating microscopes and rotary nickel-titanium instrumentation to salvage damaged teeth comfortably in single visits.",
      availability: "Consultant Specialist (By Appointment)",
      treatmentKey: "rct"
    },
    {
      id: "dr-najeer",
      name: "Dr. Mohammed Najeer",
      qualification: "MDS",
      role: "Consultant Periodontist",
      specialties: ["Periodontics & Gum Care", "Laser Gum Depigmentation", "Bone Grafting & Implants"],
      regNo: "17316",
      experience: "Consultant Periodontist",
      image: "images/doctors/dr-najeer.jpg",
      bio: "Specializing in periodontal surgeries, laser gum treatments, and computer-guided implantology, Dr. Mohammed Najeer restores long-term gum and bone foundation.",
      availability: "Consultant Specialist (By Appointment)",
      treatmentKey: "implants"
    }
  ],

  treatments: [
    {
      id: "ortho-aligners",
      category: "ortho",
      categoryName: "Orthodontics",
      badge: "Chief Speciality",
      icon: "grid_goldenratio",
      image: "images/treatments/clear-aligners.jpg",
      title: "Orthodontics & Clear Aligners",
      shortDesc: "Metal, ceramic self-ligating braces, and custom clear aligners for crooked teeth, deep bites, and jaw realignment supervised by Dr. Nazeer (MDS).",
      fullDesc: "Our orthodontic department provides custom tailored digital smile alignment. From advanced ceramic self-ligating brackets to invisible 3D clear aligners, we treat crowding, gaps, overbites, underbites, and crossbites with minimal discomfort.",
      duration: "6 to 18 Months",
      sessions: "Monthly or bi-monthly follow-ups",
      benefits: ["Computerized 3D digital smile simulation", "Virtually invisible aligner trays available", "Zero dietary restrictions with removable aligners", "Supervised by Dr. Nazeer (20+ yrs experience)"],
      procedureSteps: ["Intraoral 3D Digital Scan & Smile Simulation", "Custom Aligner Tray or Bracket Fabrication", "Gentle Placement & Tooth Alignment Phase", "Retention Phase for Lifetime Smile Stability"],
      suitableFor: ["Adults with crooked or overlapping teeth", "Teens seeking discrete teeth alignment", "Overbite, underbite, and spacing issues"]
    },
    {
      id: "orthodontic-brackets",
      category: "ortho",
      categoryName: "Orthodontics",
      badge: "Fixed Braces",
      icon: "dentistry",
      image: "images/treatments/orthodontic-brackets.jpg",
      title: "Orthodontic Brackets",
      shortDesc: "Modern bracket-based orthodontic treatment designed to correct tooth alignment and improve bite function and smile aesthetics.",
      fullDesc: "Modern bracket-based orthodontic treatment designed to correct tooth alignment and improve bite function and smile aesthetics. Utilizing precision metal and ceramic bracket systems engineered for efficient tooth movement, minimal discomfort, and reliable long-term stability.",
      duration: "12 to 24 Months",
      sessions: "Follow-up adjustment every 4 to 6 weeks",
      benefits: ["Highly effective for complex crowding, bite discrepancies, and tooth rotations", "Robust, proven metal and aesthetic ceramic bracket options", "Custom archwire sequencing for gentle, continuous biological forces", "Supervised throughout by Chief Orthodontist Dr. Nazeer P. Chittayil (MDS)"],
      procedureSteps: ["Comprehensive Diagnostic Casts, Radiographs & Cephalometric Analysis", "Precision Tooth Conditioning & Individual Bracket Bonding", "Archwire Engagement & Systematic Realignment Phases", "De-bonding, Polishing & Custom Retention Appliance Delivery"],
      suitableFor: ["Teens and adults with moderate to severe malocclusion", "Deep bites, open bites, crossbites, and severe crowding", "Patients desiring reliable, proven fixed orthodontic correction"]
    },
    {
      id: "dental-implants",
      category: "surgery",
      categoryName: "Surgical & Implants",
      badge: "Titanium Fixtures",
      icon: "hardware",
      image: "images/treatments/dental-implants.jpg",
      title: "Dental Implants & Bridges",
      shortDesc: "Permanent natural-looking replacements for single or multiple missing teeth using biocompatible titanium screws and zirconia ceramic crowns.",
      fullDesc: "Dental implants are the gold standard for missing teeth replacement. Made of medical-grade biocompatible titanium fused directly to jaw bone, topped with lifelike monolithic zirconia crowns.",
      duration: "1 to 3 Sessions",
      sessions: "Planning, Fixture Placement & Crown Loading",
      benefits: ["Restores 100% natural chewing strength", "Preserves adjacent natural teeth without grinding", "Prevents facial bone resorption & sagging", "Lifetime durability with proper hygiene"],
      procedureSteps: ["3D CBCT Bone Density & Nerve Mapping", "Micro-Surgical Implant Fixture Placement", "Osseointegration Healing Period", "Permanent Custom Zirconia Crown Fitting"],
      suitableFor: ["Single or multiple missing teeth", "Loose dentures requiring implant overdenture", "Accidental tooth loss"]
    },
    {
      id: "root-canal",
      category: "restorative",
      categoryName: "Root Canal & Restorative",
      badge: "Painless Single-Sitting",
      icon: "healing",
      image: "images/treatments/root-canal.jpg",
      title: "Root Canal Treatment (RCT)",
      shortDesc: "Eliminate severe toothache and infected nerve tissue while salvaging the natural tooth. Performed by specialist endodontist Dr. Sharath Gopinath.",
      fullDesc: "Say goodbye to toothache with painless microscopic root canal therapy. We remove infected pulp tissue, disinfect the canals with rotary lasers, and seal the chamber with biocompatible gutta-percha.",
      duration: "45 - 60 Minutes",
      sessions: "Usually single sitting (complex cases 2 sittings)",
      benefits: ["Immediate relief from acute toothache and sensitivity", "Preserves your natural tooth structure", "Painless anesthesia protocol", "Digital apex locator precision"],
      procedureSteps: ["Local Anesthesia & Rubber Dam Isolation", "Microscopic Debridement of Infected Pulp", "Sterile Disinfection & Canal Sealing", "Core Build-up & Protective Crown Fitment"],
      suitableFor: ["Severe throbbing tooth pain", "Deep cavity reaching nerve pulp", "Teeth sensitive to hot/cold or chewing"]
    },
    {
      id: "cosmetic-smile",
      category: "restorative",
      categoryName: "Root Canal & Restorative",
      badge: "Aesthetic Design",
      icon: "sentiment_satisfied",
      image: "images/treatments/porcelain-veneers.jpg",
      title: "Smile Makeovers & Veneers",
      shortDesc: "Custom ceramic laminate veneers, professional in-office teeth whitening, composite bonding, and aesthetic contouring for a radiant smile.",
      fullDesc: "Design your dream smile with precision cosmetic dentistry. Using ultra-thin E-Max porcelain veneers, composite direct bonding, and diode laser whitening, we craft symmetrical, dazzling smiles.",
      duration: "1 to 2 Weeks",
      sessions: "2 to 3 Visits",
      benefits: ["Corrects permanent tooth stains & fluorosis", "Fixes chipped, worn, or unevenly shaped teeth", "Instantly brightens teeth up to 8 shades", "Natural light-reflecting translucency"],
      procedureSteps: ["Digital Smile Design & Shade Matching", "Minimal Tooth Preparation & Mockup Try-In", "Custom Porcelain Veneer Lab Crafting", "High-Bond Adhesive Final Placement"],
      suitableFor: ["Chipped or cracked front teeth", "Fluorosis or tetracycline stains", "Gaps between front teeth"]
    },
    {
      id: "periodontics-gum",
      category: "surgery",
      categoryName: "Surgical & Implants",
      badge: "Gum Speciality",
      icon: "water_drop",
      image: "images/treatments/periodontics-gum-care.jpg",
      title: "Periodontics & Laser Gum Therapy",
      shortDesc: "Laser treatment for bleeding gums, pyorrhea therapy, ultrasonic deep scaling, bone augmentation, and flap surgeries by Dr. Mohammed Najeer.",
      fullDesc: "Healthy gums are the foundation of healthy teeth. Our periodontal therapies eradicate bacteria, resolve bleeding gums, eliminate bad breath, and rebuild supportive bone.",
      duration: "30 - 45 Minutes per quad",
      sessions: "1 to 2 Sessions",
      benefits: ["Stops gum bleeding and bad breath", "Painless diode laser gum contouring", "Prevents tooth loosening and premature loss", "Deep subgingival ultrasonic hygiene"],
      procedureSteps: ["Periodontal Pocket & Plaque Depth Mapping", "Ultrasonic Subgingival Scaling & Root Planing", "Laser Decontamination of Bacterial Pockets", "Maintenance Protocol & Oral Hygiene Instruction"],
      suitableFor: ["Bleeding gums when brushing", "Persistent bad breath (halitosis)", "Receding or swollen dark gums"]
    },
    {
      id: "pediatric-dentistry",
      category: "all",
      categoryName: "Preventive & Pediatric",
      badge: "Kid Friendly",
      icon: "child_care",
      image: "images/treatments/pediatric-dentistry.jpg",
      title: "Pediatric Dentistry",
      shortDesc: "Gentle, preventive and child-friendly dental care designed to build healthy smiles from an early age.",
      fullDesc: "Gentle, preventive and child-friendly dental care designed to build healthy smiles from an early age. We create a warm, non-threatening atmosphere for our young champions. From cavity prevention sealants and gentle fillings to thumbsucking habit appliances and early orthodontic guidance.",
      duration: "30 Minutes",
      sessions: "Every 6 months routine checkup",
      benefits: ["Fear-free, compassionate kid-friendly environment", "Prevents childhood dental cavities early", "Early guidance for healthy permanent tooth eruption", "Cavity-shielding fluoride treatments"],
      procedureSteps: ["Friendly Acclimatization & Visual Exam", "Gentle Cleaning & Plaque Removal", "Fluoride Varnish & Sealant Application", "Parent Guidance on Nutrition & Brushing"],
      suitableFor: ["Infants and toddlers (first tooth review)", "School children with cavities", "Early crooked tooth guidance"]
    }
  ],

  transformationCases: [
    {
      id: 1,
      tag: "Case 01",
      title: "Smile Transformation",
      treatment: "Orthodontic Treatment",
      duration: "14 Months",
      technique: "Precision Bracket Realignment",
      doctor: "Dr. Nazeer P. Chittayil (MDS Orthodontics)",
      before: "images/before-after/case-01-before.jpg",
      after: "images/before-after/case-01-after.jpg",
      beforeImg: "images/before-after/case-01-before.jpg",
      afterImg: "images/before-after/case-01-after.jpg",
      description: "Precision bracket realignment addressing severe crowding and anterior rotation for biological bite symmetry."
    },
    {
      id: 2,
      tag: "Case 02",
      title: "Smile Transformation",
      treatment: "Smile Alignment",
      duration: "8 Months",
      technique: "Custom 3D Digital Clear Aligners",
      doctor: "Dr. Nazeer P. Chittayil (MDS Orthodontics)",
      before: "images/before-after/case-02-before.jpg",
      after: "images/before-after/case-02-after.jpg",
      beforeImg: "images/before-after/case-02-before.jpg",
      afterImg: "images/before-after/case-02-after.jpg",
      description: "Clear aligner therapy correcting midline deviation and anterior spacing with zero tooth extractions."
    },
    {
      id: 3,
      tag: "Case 03",
      title: "Smile Transformation",
      treatment: "Dental Transformation",
      duration: "3 Months",
      technique: "Titanium Fixture & Zirconia Crown",
      doctor: "Dr. Mohammed Najeer (MDS Periodontics & Implants)",
      before: "images/before-after/case-03-before.jpg",
      after: "images/before-after/case-03-after.jpg",
      beforeImg: "images/before-after/case-03-before.jpg",
      afterImg: "images/before-after/case-03-after.jpg",
      description: "Comprehensive aesthetic rehabilitation with precision implant fixture and custom ceramic crown integration."
    },
    {
      id: 4,
      tag: "Case 04",
      title: "Smile Transformation",
      treatment: "Fixed Orthodontic Realignment",
      duration: "10 Months",
      technique: "Precision Orthodontic Bracket Therapy",
      doctor: "Dr. Nazeer P. Chittayil (MDS Orthodontics)",
      before: "images/before-after/case-04-pediatric-before.jpg",
      after: "images/before-after/case-04-pediatric-after.jpg",
      beforeImg: "images/before-after/case-04-pediatric-before.jpg",
      afterImg: "images/before-after/case-04-pediatric-after.jpg",
      description: "Orthodontic bracket alignment resolving severe anterior crowding, rotation, and arch asymmetry for symmetrical smile aesthetics."
    }
  ],

  cases: [
    {
      id: "case-01",
      category: "ortho",
      tag: "Case 01",
      title: "Orthodontic Treatment",
      duration: "14 Months",
      technique: "Precision Bracket Realignment",
      doctor: "Dr. Nazeer P. Chittayil (MDS Orthodontics)",
      before: "images/before-after/case-01-before.jpg",
      after: "images/before-after/case-01-after.jpg",
      beforeImg: "images/before-after/case-01-before.jpg",
      afterImg: "images/before-after/case-01-after.jpg",
      patientQuote: "My teeth alignment completely changed with Dr. Nazeer's treatment. Systematic, comfortable, and pain-free.",
      description: "Precision bracket realignment addressing severe crowding and anterior rotation for biological bite symmetry."
    },
    {
      id: "case-02",
      category: "ortho",
      tag: "Case 02",
      title: "Smile Alignment",
      duration: "8 Months",
      technique: "Custom 3D Digital Clear Aligners",
      doctor: "Dr. Nazeer P. Chittayil (MDS Orthodontics)",
      before: "images/before-after/case-02-before.jpg",
      after: "images/before-after/case-02-after.jpg",
      beforeImg: "images/before-after/case-02-before.jpg",
      afterImg: "images/before-after/case-02-after.jpg",
      patientQuote: "I was conscious about my gaps. Within 8 months with Dr. Nazeer's clear aligners, I smile with complete confidence.",
      description: "Clear aligner therapy correcting midline deviation and anterior spacing with zero tooth extractions."
    },
    {
      id: "case-03",
      category: "surgery",
      tag: "Case 03",
      title: "Dental Transformation",
      duration: "3 Months",
      technique: "Titanium Fixture & Zirconia Crown",
      doctor: "Dr. Mohammed Najeer (MDS Periodontics & Implants)",
      before: "images/before-after/case-03-before.jpg",
      after: "images/before-after/case-03-after.jpg",
      beforeImg: "images/before-after/case-03-before.jpg",
      afterImg: "images/before-after/case-03-after.jpg",
      patientQuote: "Lost my front tooth in an accident. Dr. Najeer restored it completely with an implant. Looks and bites naturally!",
      description: "Comprehensive aesthetic rehabilitation with precision implant fixture and custom ceramic crown integration."
    },
    {
      id: "case-04",
      category: "ortho",
      tag: "Case 04",
      title: "Fixed Orthodontic Realignment",
      duration: "10 Months",
      technique: "Precision Orthodontic Bracket Therapy",
      doctor: "Dr. Nazeer P. Chittayil (MDS Orthodontics)",
      before: "images/before-after/case-04-pediatric-before.jpg",
      after: "images/before-after/case-04-pediatric-after.jpg",
      beforeImg: "images/before-after/case-04-pediatric-before.jpg",
      afterImg: "images/before-after/case-04-pediatric-after.jpg",
      patientQuote: "My crowded teeth were corrected with precision brackets under Dr. Nazeer's care. Completely transformed my smile.",
      description: "Orthodontic bracket alignment resolving severe anterior crowding, rotation, and arch asymmetry for symmetrical smile aesthetics."
    }
  ],

  tourismPricing: [
    {
      procedure: "Titanium Dental Implant (Fixture + Abutment + Crown)",
      cymorPrice: "₹28,000 - ₹38,000",
      gulfPrice: "AED 5,000 - 9,000 (SAR 5,200 - 9,300)",
      savingsPct: "75% - 85% Savings",
      daysNeeded: "3 - 5 Days Initial Phase"
    },
    {
      procedure: "All-Ceramic Zirconia / E-Max Crown",
      cymorPrice: "₹8,000 - ₹12,000",
      gulfPrice: "AED 2,500 - 4,000 (SAR 2,600 - 4,100)",
      savingsPct: "80% - 90% Savings",
      daysNeeded: "3 Days"
    },
    {
      procedure: "Microscopic Root Canal + Crown",
      cymorPrice: "₹9,000 - ₹14,000",
      gulfPrice: "AED 3,000 - 5,000 (SAR 3,100 - 5,200)",
      savingsPct: "80% - 85% Savings",
      daysNeeded: "2 - 3 Days"
    },
    {
      procedure: "Clear Invisible Aligners (Complete Treatment)",
      cymorPrice: "₹65,000 - ₹1,20,000",
      gulfPrice: "AED 12,000 - 22,000 (SAR 12,500 - 23,000)",
      savingsPct: "70% - 75% Savings",
      daysNeeded: "Digital Scan in 1 Day, Trays Shipped Worldwide"
    },
    {
      procedure: "Full Smile Makeover (6-8 Porcelain Veneers)",
      cymorPrice: "₹60,000 - ₹95,000",
      gulfPrice: "AED 16,000 - 30,000 (SAR 16,500 - 31,000)",
      savingsPct: "80% - 85% Savings",
      daysNeeded: "5 - 7 Days"
    }
  ],

  emergencyGuides: [
    {
      id: "toothache",
      title: "Severe Acute Toothache",
      icon: "healing",
      urgentSteps: [
        "Rinse mouth gently with warm saltwater (half teaspoon salt in warm water).",
        "Gently floss to remove any trapped food debris around the aching tooth.",
        "Take an over-the-counter pain reliever like Paracetamol/Ibuprofen (Never place aspirin directly on gums).",
        "Apply a cold compress on your cheek outside the painful area to reduce throbbing.",
        "Call CYMOR Emergency Hotline +91 99952 68787 immediately for same-day triage."
      ]
    },
    {
      id: "knocked-out",
      title: "Knocked-Out (Avulsed) Tooth",
      icon: "emergency",
      urgentSteps: [
        "ACT QUICKLY: The tooth has the highest chance of survival if re-implanted within 60 minutes!",
        "Pick up the tooth by the CROWN (white biting part) only. DO NOT touch the root!",
        "If dirty, gently rinse with cold milk or saline for 10 seconds. DO NOT scrub or wipe with towel.",
        "Store the tooth in a small cup of COLD MILK or the patient's own saliva.",
        "Rush immediately to CYMOR Dental Clinic Ponnani or call our emergency hotline."
      ]
    },
    {
      id: "bleeding",
      title: "Bleeding Gums or Oral Trauma",
      icon: "water_drop",
      urgentSteps: [
        "Apply firm, continuous pressure with a clean sterile gauze or cotton cloth for 15-20 minutes.",
        "Keep the head elevated above the heart level to reduce blood pressure.",
        "Apply an ice pack to the outside of the lip/face to minimize swelling.",
        "If bleeding does not stop after 20 minutes of firm pressure, call +91 73807 74477 immediately."
      ]
    },
    {
      id: "broken-bracket",
      title: "Broken Braces Wire or Bracket",
      icon: "grid_goldenratio",
      urgentSteps: [
        "If a wire is poking your cheek, cover the sharp tip with orthodontic relief wax or clean cotton.",
        "DO NOT cut the wire with pliers, as it may be accidentally swallowed or inhaled.",
        "If a bracket is loose, leave it on the wire and secure it with wax until clinic visit.",
        "Contact Dr. Nazeer's orthodontic team at CYMOR to schedule an emergency wire adjustment."
      ]
    }
  ]
};
