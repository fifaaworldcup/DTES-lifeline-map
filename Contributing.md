# Contributing to Vancouver DTES Lifeline Map

Thank you for your interest in contributing to **DTES Lifeline Map**!
This community project relies on volunteers like you to maintain and improve this vital resource.

---

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

**To add a new service location:**

### 1. Verify the Resource
- Confirm the service is in the **DTES area**
- Verify hours and contact info
- Ensure it is a **public service**

### 2. Prepare the Information
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
```

### 3. Submit a Pull Request
- Fork the repository
- Add the resource to the `dtesResources` array
- Test the changes locally
- Submit a PR with a clear description

---

## 3. Code Contributions

### Development Setup
```bash
git clone https://github.com/fifaaworldcup.github.io/DTESsupport.github.io.git
cd DTESsupport.github.io
python -m http.server 8000
# or:
npx serve .
```

### Code Style Guidelines
- Use **ES6+ JavaScript features**
- Follow existing naming conventions
- Add comments for complex logic
- Ensure **accessibility** (ARIA labels, keyboard navigation)
- Test on **multiple devices and browsers**

---

## 4. Translation Improvements

Current languages: English · Chinese · Spanish · French · Portuguese · Hindi · Punjabi

### Adding a New Language
```javascript
const translations = {
  newLangCode: {
    title: "Translated Title",
    subtitle: "Translated subtitle"
  }
};
```

---

## 5. Design Improvements

### UI / UX Contributions
- Maintain **WCAG 2.1** accessibility standards
- Ensure **mobile responsiveness**
- Test with **screen readers**
- Test **keyboard navigation**

---

## 📋 Development Guidelines

### Code Structure
- Keep functions **modular and reusable**
- Use **semantic HTML5**
- Follow **BEM-like CSS naming**
- Implement proper **error handling**

### Testing Checklist
- Works on all major browsers
- Mobile responsive
- Screen reader compatible
- Keyboard navigable
- High contrast mode functional
- Location services functional
- All translations display properly

---

## 🔄 Review Process

- Automated checks must pass
- Code follows guidelines
- Documentation updated
- Maintainer approval required

---

## 📞 Getting Help

Email: **dteslifeline.info@gmail.com**

---

## 🙏 Thank You

Your contribution helps improve access to critical services in the DTES community.
Made with ❤️ by the community.

