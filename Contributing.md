
# Contributing to Vancouver DTES Lifeline Map

Thank you for your interest in contributing to DTES Lifeline Map! This community project relies on volunteers like you to maintain and improve this vital resource.

## 🤝 How to Contribute

### 1. Reporting Issues

**Found incorrect information?**
- Open an issue on GitHub with details
- Include the resource name and correct information
- Provide source verification if possible

**Bug reports?**
- Describe the issue clearly
- Include steps to reproduce
- Mention browser/device information
- Add screenshots if applicable

### 2. Adding New Resources

**To add a new service location:**

1. **Verify the Resource**
   - Confirm the service is in the DTES area
   - Verify hours and contact information
   - Ensure it's a public service

2. **Prepare the Information**
   ```javascript
   {
     name: "Service Name",
     lat: 49.2811,
     lng: -123.1005,
     type: "Category",
     description: "Brief description of services",
     hours: "Operating hours",
     phone: "xxx-xxx-xxxx",
     address: "Street address",
     status: "open/closed/unknown"
   }
Submit a Pull Request
Fork the repository
Add the resource to dtesResources array
Test the changes locally
Submit a PR with a clear description
3. Code Contributions
Development Setup:

bash

Line Wrapping

Collapse
Copy
1
2
3
4
5
6
7
8
9
10
# Clone the repository
git clone https://github.com/fifaaworldcup.github.io/DTESsupport.github.io.git
cd DTESsupport.github.io

# Start a local server (recommended)
python -m http.server 8000
# OR use Node.js
npx serve .

# Open http://localhost:8000 in your browser
Code Style Guidelines:

Use ES6+ JavaScript features
Follow existing naming conventions
Add comments for complex logic
Ensure accessibility (ARIA labels, keyboard navigation)
Test on multiple devices/browsers
4. Translation Improvements
To add or improve translations:

Current Languages: English, Chinese, Spanish, French, Portuguese, Hindi, Punjabi
Adding a New Language:
javascript

Line Wrapping

Collapse
Copy
1
2
3
4
5
6
7
8
⌄
⌄
const translations = {
  // ... existing languages
  'newLangCode': {
    title: "Translated Title",
    subtitle: "Translated subtitle",
    // ... all other keys
  }
};
Update Language Selector: 
5. Design Improvements
UI/UX Contributions:

Maintain accessibility standards (WCAG 2.1)
Ensure mobile responsiveness
Test with screen readers
Consider low-vision users
Test keyboard navigation
📋 Development Guidelines
Code Structure
Keep functions modular and reusable
Use semantic HTML5 elements
Follow BEM-like CSS naming
Implement proper error handling
Testing Checklist
 Works on Chrome, Firefox, Safari, Edge
 Mobile responsive (iOS, Android)
 Screen reader compatible
 Keyboard navigable
 High contrast mode works
 Location services functional
 All translations display correctly
Performance
Optimize images and assets
Minimize external dependencies
Ensure fast loading on slow connections
Test offline functionality
🏷️ Issue Labels
When creating issues, please use these labels:

bug: Software bugs or errors
enhancement: New features or improvements
data-update: Resource information changes
translation: Language-related issues
accessibility: A11y improvements
documentation: README or guide updates
urgent: Critical issues requiring immediate attention
🔄 Review Process
Initial Review
Automated checks pass
Code follows guidelines
Documentation updated
Community Review
At least one maintainer approval
Community feedback welcome
Accessibility check
Testing
Manual testing on multiple devices
Screen reader testing
Performance verification
Deployment
Merged to main branch
Auto-deployed to GitHub Pages
Community notification
📞 Getting Help
Questions? Need guidance?

Open an issue with the question label
Join our GitHub Discussions
Email: info@dteslifeline.org
Check existing issues and discussions
🎯 Priority Areas
We especially need help with:

Resource Verification: Regularly checking service hours
Translation Quality: Improving non-English translations
Mobile Testing: Testing on various devices
Community Outreach: Spreading awareness in DTES
Accessibility: Ensuring WCAG 2.1 compliance
🏆 Contributor Recognition
Contributors are recognized in:

GitHub contributors list
Project acknowledgments
Annual community report
Special thanks in app footer
📜 Code of Conduct
Please read and follow our Code of Conduct. We're committed to providing a welcoming and inclusive environment for all contributors.

🔐 Security Considerations
Never commit personal information
Validate all user inputs
Follow secure coding practices
Report security issues privately
📚 Resources for Contributors
Leaflet.js Documentation
Tailwind CSS Guide
Web Accessibility Guidelines
OpenStreetMap
GitHub Pages Documentation
🙏 Thank You
Your contribution helps save lives and improve access to critical services in the DTES community. Every improvement, no matter how small, makes a difference.

Made with ❤️ by the community, for the community
