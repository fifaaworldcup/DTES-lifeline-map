# Contributing to Vancouver DTES Lifeline Map

Thank you for your interest in contributing to **DTES Lifeline Map**!  
This community project relies on volunteers like you to maintain and improve this vital resource.

## 🤝 How to Contribute

### 1. Reporting Issues

**Found incorrect information?**
- Open an issue on GitHub with details
- Include the resource name and the correct information
- Provide source verification if possible

**Bug reports**
- Describe the issue clearly
- Include steps to reproduce
- Mention browser/device information
- Add screenshots if helpful

---

## 2. Adding New Resources

### **To add a new service location:**

#### **1. Verify the Resource**
- Confirm the service is in the **DTES area**
- Verify hours and contact info
- Ensure it is a **public service**

#### **2. Prepare the Information**
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

### **Code Style Guidelines**
- Use **ES6+ JavaScript features**
- Follow existing naming conventions
- Add comments for complex logic
- Ensure **accessibility** (ARIA labels, keyboard navigation)
- Test on multiple devices and browsers

---

## 4. Translation Improvements

To add or improve translations:

**Current languages:** English, Chinese, Spanish, French, Portuguese, Hindi, Punjabi

### **Adding a New Language**
```javascript
const translations = {
  // ... existing languages
  newLangCode: {
    title: "Translated Title",
    subtitle: "Translated subtitle",
    // ... all other keys
  }
};

Also update the **language selector** in the UI.

---

## 5. Design Improvements

### **UI/UX Contributions**
- Maintain **WCAG 2.1** accessibility standards
- Ensure **mobile responsiveness**
- Test with screen readers
- Consider low-vision users
- Test keyboard navigation

---

## 📋 Development Guidelines

### **Code Structure**
- Keep functions **modular and reusable**
- Use **semantic HTML5**
- Follow **BEM-like CSS naming**
- Implement proper **error handling**

### **Testing Checklist**
- Works on **Chrome, Firefox, Safari, Edge**
- Mobile responsive (iOS + Android)
- Screen reader compatible
- Fully keyboard navigable
- High contrast mode functional
- Location services working
- All translations display correctly

### **Performance**
- Optimize images and assets
- Minimize external dependencies
- Ensure fast loading on slow connections
- Test offline functionality

---

## 🏷️ Issue Labels

Please use these labels when creating issues:

- **bug** — Software bugs or errors
- **enhancement** — New features or improvements
- **data-update** — Resource information changes
- **translation** — Language-related issues
- **accessibility** — A11y improvements
- **documentation** — README or guide updates
- **urgent** — Critical issues needing immediate attention

---

## 🔄 Review Process

### **Initial Review**
- Automated checks must pass
- Code follows guidelines
- Documentation updated

### **Community Review**
- At least **one maintainer approval**
- Community feedback welcomed
- Accessibility check completed

### **Testing**
- Manual testing on multiple devices
- Screen reader testing
- Performance verification

### **Deployment**
- Merged into `main` branch
- Auto-deployed to GitHub Pages
- Community notified

---

## 📞 Getting Help

Need guidance?

- Open an issue with the `question` label
- Join our GitHub Discussions
- Email: **info@dteslifeline.org**
- Check existing issues and threads

---

## 🎯 Priority Areas

We especially need help with:

- **Resource Verification** — Checking service hours regularly
- **Translation Quality** — Improving accuracy
- **Mobile Testing** — Testing on a variety of devices
- **Community Outreach** — Sharing the tool within DTES
- **Accessibility** — Ensuring WCAG 2.1 compliance

---

## 🏆 Contributor Recognition

Contributors are recognized in:

- GitHub contributors list
- Project acknowledgments
- Annual community report
- Special thanks in the app footer

---

## 📜 Code of Conduct

Please read and follow our Code of Conduct.  
We are committed to maintaining a welcoming and inclusive environment for all contributors.

---

## 🔐 Security Considerations

- Never commit personal information
- Validate all user inputs
- Follow secure coding practices
- Report security issues privately

---

## 📚 Resources for Contributors

- Leaflet.js Documentation  
- Tailwind CSS Guide  
- Web Accessibility Guidelines  
- OpenStreetMap  
- GitHub Pages Documentation  

---

## 🙏 Thank You

Your contribution helps save lives and improve access to critical services in the DTES community.  
Every improvement, no matter how small, makes a difference.

**Made with ❤️ by the community, for the community.**
