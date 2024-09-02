// js/main.js

// JSON "database" for users and issues
const db = {
    users: [],
    issues: []
};

document.getElementById('show-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    db.users.push({ username, password, role });
    alert('Account created successfully! Please log in.');

    document.getElementById('register-form').reset();
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    const user = db.users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        if (role === 'student') {
            document.getElementById('issue-section').classList.remove('hidden');
        } else if (role === 'admin') {
            document.getElementById('admin-section').classList.remove('hidden');
        }
    } else {
        alert('Invalid username, password, or role');
    }
});

document.getElementById('category').addEventListener('change', function(event) {
    const subCategorySelect = document.getElementById('sub-category');
    subCategorySelect.innerHTML = '<option value="" disabled selected>Select Subcategory</option>';
    if (event.target.value === 'Academic') {
        const options = ['Exams', 'Grades', 'Assignments'];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            subCategorySelect.appendChild(opt);
        });
    } else if (event.target.value === 'Campus') {
        const options = ['Housing', 'Cafeteria', 'Facilities'];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            subCategorySelect.appendChild(opt);
        });
    }
});

document.getElementById('issue-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const studentName = document.getElementById('student-name').value;
    const studentId = document.getElementById('student-id').value;
    const category = document.getElementById('category').value;
    const subCategory = document.getElementById('sub-category').value;
    const comment = document.getElementById('comment').value;

    const issue = { studentName, studentId, category, subCategory, comment };
    db.issues.push(issue);

    const issueList = document.getElementById('issue-list');
    const issueItem = document.createElement('li');
    issueItem.textContent = `Name: ${studentName}, Student ID: ${studentId}, Category: ${category}, Subcategory: ${subCategory}, Comment: ${comment}`;
    issueList.appendChild(issueItem);

    const adminIssueList = document.getElementById('admin-issue-list');
    const adminIssueItem = document.createElement('li');
    adminIssueItem.textContent = `Name: ${studentName}, Student ID: ${studentId}, Category: ${category}, Subcategory: ${subCategory}, Comment: ${comment}`;
    adminIssueList.appendChild(adminIssueItem);

    document.getElementById('issue-form').reset();
});
