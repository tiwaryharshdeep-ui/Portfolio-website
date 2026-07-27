const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateResumePDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 (595.28 x 841.89 points)
    const { width, height } = page.getSize();
    
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
    
    // Top Banner (Dark Navy Accent)
    page.drawRectangle({
        x: 0,
        y: height - 110,
        width: width,
        height: 110,
        color: rgb(0.04, 0.08, 0.18)
    });
    
    // Candidate Name
    page.drawText('HARSHDEEP TIWARI', {
        x: 36,
        y: height - 42,
        size: 20,
        font: fontBold,
        color: rgb(0, 0.9, 1)
    });
    
    // Target Role Title
    page.drawText('DIGITAL MARKETING EXECUTIVE', {
        x: 36,
        y: height - 62,
        size: 11,
        font: fontBold,
        color: rgb(0.85, 0.92, 1)
    });
    
    // Contact Header Line
    const contactLine1 = 'Mughalsarai, UP  |  +91 9005454362  |  tiwaryharshdeep@gmail.com';
    const contactLine2 = 'LinkedIn: linkedin.com/in/harshdeep-tiwari-464042344  |  Portfolio: portfolio-website-79bw.onrender.com';
    
    page.drawText(contactLine1, {
        x: 36,
        y: height - 80,
        size: 8.5,
        font: fontRegular,
        color: rgb(0.8, 0.88, 0.98)
    });
    
    page.drawText(contactLine2, {
        x: 36,
        y: height - 94,
        size: 8.5,
        font: fontRegular,
        color: rgb(0.75, 0.85, 0.95)
    });

    let currentY = height - 130;
    const marginX = 36;
    const contentWidth = width - 72;

    function drawSectionTitle(title) {
        page.drawRectangle({
            x: marginX,
            y: currentY - 1,
            width: contentWidth,
            height: 15,
            color: rgb(0.92, 0.96, 1)
        });
        
        page.drawRectangle({
            x: marginX,
            y: currentY - 1,
            width: 4,
            height: 15,
            color: rgb(0, 0.65, 0.85)
        });

        page.drawText(title.toUpperCase(), {
            x: marginX + 8,
            y: currentY + 3,
            size: 9.5,
            font: fontBold,
            color: rgb(0.05, 0.15, 0.3)
        });

        currentY -= 20;
    }

    function addWrappedText(text, size = 8.5, font = fontRegular, color = rgb(0.2, 0.2, 0.25), indent = 0, lineGap = 10.5) {
        const words = text.split(' ');
        let line = '';
        const maxWidth = contentWidth - indent;

        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            let textWidth = font.widthOfTextAtSize(testLine, size);
            if (textWidth > maxWidth && i > 0) {
                page.drawText(line.trim(), {
                    x: marginX + indent,
                    y: currentY,
                    size: size,
                    font: font,
                    color: color
                });
                line = words[i] + ' ';
                currentY -= lineGap;
            } else {
                line = testLine;
            }
        }
        if (line.trim().length > 0) {
            page.drawText(line.trim(), {
                x: marginX + indent,
                y: currentY,
                size: size,
                font: font,
                color: color
            });
            currentY -= lineGap;
        }
    }

    // 1. PROFESSIONAL SUMMARY
    drawSectionTitle('Professional Summary');
    addWrappedText('Enthusiastic and analytical B.Com graduate (2025) seeking a Digital Marketing Executive role to drive brand awareness, organic search visibility, and performance marketing growth. Combines a solid commercial foundation with practical expertise in Search Engine Optimization (SEO), Social Media Marketing (SMM), Google Analytics (GA4), Google Ads, and AI-driven content automation. Possesses strong data analysis skills, strategic communication capabilities, and a rapid learning mindset dedicated to maximizing business ROI.', 8.5, fontRegular, rgb(0.2, 0.2, 0.25), 0, 11);
    currentY -= 4;

    // 2. TECHNICAL SKILLS & CORE COMPETENCIES
    drawSectionTitle('Technical Skills & Core Competencies');
    
    const skillCategories = [
        { cat: 'Digital Marketing & Strategy:', skills: 'SEO, Technical SEO, Keyword Research, On-Page/Off-Page SEO, Social Media Marketing (SMM), Content Strategy, Email Marketing, Lead Generation' },
        { cat: 'Paid Acquisition & Analytics:', skills: 'Google Ads (PPC), Meta Ads Manager, Google Analytics (GA4), Conversion Tracking, Campaign ROI Optimization' },
        { cat: 'AI & Automation:', skills: 'Generative AI, Prompt Engineering (ChatGPT, Claude), n8n Workflow Automation, Automated Content Pipelines' },
        { cat: 'Tools & Web Basics:', skills: 'Canva, Figma, HTML5, CSS3, JavaScript Basics, Git & GitHub, WordPress / Web CMS' }
    ];

    skillCategories.forEach(item => {
        page.drawText('• ' + item.cat, {
            x: marginX + 4,
            y: currentY,
            size: 8.5,
            font: fontBold,
            color: rgb(0, 0.45, 0.7)
        });
        const catWidth = fontBold.widthOfTextAtSize('• ' + item.cat + ' ', 8.5);
        
        page.drawText(item.skills, {
            x: marginX + 4 + catWidth,
            y: currentY,
            size: 8.5,
            font: fontRegular,
            color: rgb(0.2, 0.2, 0.25)
        });
        currentY -= 12;
    });
    currentY -= 4;

    // 3. KEY PROJECTS
    drawSectionTitle('Key Marketing & Technical Projects');

    // Project 1
    page.drawText('AI-Driven Marketing & Content Automation Workflow', {
        x: marginX + 4,
        y: currentY,
        size: 9,
        font: fontBold,
        color: rgb(0.05, 0.2, 0.4)
    });
    page.drawText('Generative AI | Prompt Engineering | Automation', {
        x: marginX + 300,
        y: currentY,
        size: 8,
        font: fontOblique,
        color: rgb(0.4, 0.4, 0.4)
    });
    currentY -= 12;
    addWrappedText('• Engineered an automated content creation workflow utilizing Generative AI prompt chains to generate platform-tailored social media captions (LinkedIn, Meta, X) and graphic concepts.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 10, 10.5);
    addWrappedText('• Integrated structured JSON output schemas to organize digital assets automatically into publish-ready campaign folders, slashing manual production time by 90%.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 10, 10.5);
    currentY -= 4;

    // Project 2
    page.drawText('Personal Portfolio Web Application', {
        x: marginX + 4,
        y: currentY,
        size: 9,
        font: fontBold,
        color: rgb(0.05, 0.2, 0.4)
    });
    page.drawText('HTML5 | CSS3 | JavaScript | Technical SEO', {
        x: marginX + 300,
        y: currentY,
        size: 8,
        font: fontOblique,
        color: rgb(0.4, 0.4, 0.4)
    });
    currentY -= 12;
    addWrappedText('• Developed and launched a fully responsive web portfolio (portfolio-website-79bw.onrender.com) showcasing campaigns, analytical skills, and web projects.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 10, 10.5);
    addWrappedText('• Implemented technical SEO best practices, Open Graph meta structures, and mobile performance optimizations for maximum search visibility.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 10, 10.5);
    currentY -= 4;

    // 4. EDUCATION
    drawSectionTitle('Education');

    page.drawText('Bachelor of Commerce (B.Com)', {
        x: marginX + 4,
        y: currentY,
        size: 9,
        font: fontBold,
        color: rgb(0.05, 0.2, 0.4)
    });
    page.drawText('Graduated: 2025  |  CGPA: 7.23 / 10.0', {
        x: marginX + 340,
        y: currentY,
        size: 8,
        font: fontBold,
        color: rgb(0, 0.5, 0.7)
    });
    currentY -= 12;
    page.drawText('Shri Harishchandra Postgraduate College, Maidagin, Varanasi (Affiliated with Mahatma Gandhi Kashi Vidyapeeth)', {
        x: marginX + 4,
        y: currentY,
        size: 8,
        font: fontOblique,
        color: rgb(0.3, 0.3, 0.35)
    });
    currentY -= 11;
    addWrappedText('• Relevant Coursework: Business Communication, Marketing Management, Business Analytics, Financial Accounting, Commercial Law.', 8, fontRegular, rgb(0.3, 0.3, 0.35), 10, 10);
    currentY -= 4;

    // 5. CERTIFICATIONS & ACHIEVEMENTS
    drawSectionTitle('Certifications & Key Achievements');
    addWrappedText('• Digital Marketing & Generative AI Specialization: Comprehensive training in SEO, Google Ads, Meta Ads Manager, GA4 Analytics, and AI Prompt Engineering.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 8, 10.5);
    addWrappedText('• Google Analytics (GA4) & Search Optimization Fundamentals: Certified expertise in performance tracking, keyword research, and conversion funnel optimization.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 8, 10.5);
    addWrappedText('• Achievement: Built an automated AI content creation pipeline reducing manual campaign drafting time by 90%.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 8, 10.5);
    addWrappedText('• Achievement: Successfully designed, SEO-optimized, and deployed a live professional web portfolio on Render with 100% mobile responsiveness.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 8, 10.5);
    currentY -= 4;

    // 6. EXTRA-CURRICULAR & LANGUAGES
    drawSectionTitle('Extra-Curricular Activities & Languages');
    addWrappedText('• Extra-Curricular Activities: Coordinated academic seminars and student marketing workshops at Shri Harishchandra PG College; active member of online AI and digital marketing strategy forums.', 8, fontRegular, rgb(0.25, 0.25, 0.3), 8, 10.5);
    addWrappedText('• Languages Spoken: English (Professional Working Proficiency), Hindi (Native / Full Professional Proficiency).', 8, fontRegular, rgb(0.25, 0.25, 0.3), 8, 10.5);

    // Footer
    page.drawRectangle({
        x: 0,
        y: 0,
        width: width,
        height: 20,
        color: rgb(0.04, 0.08, 0.18)
    });

    page.drawText('Harshdeep Tiwari  |  Digital Marketing Executive Resume  |  tiwaryharshdeep@gmail.com', {
        x: 36,
        y: 6,
        size: 7.5,
        font: fontRegular,
        color: rgb(0.75, 0.88, 1)
    });

    const pdfBytes = await pdfDoc.save();
    
    // Save PDF
    const pdfDir = path.join(__dirname, 'pdf');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);
    fs.writeFileSync(path.join(pdfDir, 'Harshdeep_Tiwari_Resume.pdf'), pdfBytes);

    const assetsDir = path.join(__dirname, 'src', 'assets');
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
    fs.writeFileSync(path.join(assetsDir, 'Harshdeep_Tiwari_Resume.pdf'), pdfBytes);

    console.log('Successfully generated single-page Digital Marketing Executive Resume PDF');
}

generateResumePDF().catch(console.error);
