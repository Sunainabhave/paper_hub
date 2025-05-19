# Dayananda Sagar Paper Hub

A web application for Dayananda Sagar University students and faculty to **access, upload, and download previous years’ question papers and schemes**, organized by department, year, and subject.

---

## Features

- **User Authentication:** Register and log in as a student or admin.
- **Role-based Access:** Only admins can upload papers; all users can download.
- **Department Browsing:** Select your department to view available papers.
- **Year & Subject Metadata:** Admins upload papers with year and subject information.
- **Secure File Uploads:** Admins can upload question papers and schemes with metadata.
- **Responsive UI:** Clean, mobile-friendly design using Bootstrap.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/) (optional)
- [SQLite3](https://www.sqlite.org/) (optional, for database inspection)

### Installation

1. **Clone the repository**
git clone https://github.com/yourusername/paper-hub.git
cd paper-hub
2. **Install dependencies**
npm install
3. **Run database migrations (if needed)**
node fix-database.js
4. **Start the server**
node server.js


---

## Usage

- **Register** as a new user or log in if you already have an account.
- **Admins** can upload papers by selecting department, year, subject, and uploading the file.
- **Students** can browse departments and download available papers.

---

## Project Structure
paper-hub/
├── public/
│ └── css/
│ └── style.css
├── uploads/
├── views/
│ ├── index.ejs
│ ├── login.ejs
│ ├── register.ejs
│ ├── department.ejs
├── database.js
├── server.js
├── fix-database.js
└── README.md



---

## Current Limitation

> **Note:**  
> While admins upload papers specifying year and subject, students currently see only a department-wise list.  
> There is no way for students to browse or filter by year or subject when downloading papers.

---

## Future Scope

- **Student Browsing by Year and Subject:**  
  Enhance the student interface to allow browsing and filtering of papers by year (1st–4th) and subject within each department.  
  - Implement dropdowns or tabs for year selection and subject selection.  
  - Dynamically show available papers based on the selected year and subject, making it easier for students to find relevant materials.  
  - Add a search or filter bar for quick access to specific subjects or paper types.

- **Advanced Filtering and Search:**  
  Add filters for paper type (question/scheme), year, subject, and keyword search to streamline access.

- **Subject Dropdowns:**  
  Replace free-text subject entry with a dropdown populated from a subject master list to reduce errors and standardize data.

- **User Profiles:**  
  Let users manage their info and see their download/upload history.

- **Notifications:**  
  Email or in-app notifications when new papers are uploaded.

- **Admin Dashboard:**  
  Analytics on uploads, downloads, and user activity.

- **Bulk Upload:**  
  Allow admins to upload multiple papers at once.

- **File Previews:**  
  Inline PDF previews before download.

- **Access Control:**  
  Restrict certain papers to specific users or groups.

- **API Integration:**  
  Provide REST APIs for integration with other university systems.

- **Mobile App:**  
  Companion app for easier access on smartphones.

- **Dark Mode:**  
  User-selectable dark/light themes.

- **Better Error Handling:**  
  More user-friendly error messages and logging.

- **Cloud Storage:**  
  Store files on AWS S3, Google Drive, or similar for scalability.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---


**Thank you for using Paper Hub!**


