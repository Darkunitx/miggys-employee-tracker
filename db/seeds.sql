INSERT INTO department (department_name)
VALUES ("Operations Management"),
       ("Human Resources"),
       ("Finance"),
       ("Marketing"),
       ("information technology");

INSERT INTO role (title, salary, department_id)
VALUES ("Operations Manager", 100000, 1),
       ("Quality control specialist", 60000, 1),
       ("Employement specialist", 50000, 2),
       ("Human Resources Manager", 70000, 2),
       ("Recruiter", 55000, 2),
       ("Accountant", 90000, 3),
       ("Financial Adviser", 119000, 3),
       ("Social Media Marketing", 100000, 4),
       ("Brand Management", 70000, 4),
       ("Software Developer", 110000, 5),
       ("Web Developer", 80000, 5),
       ("IT Project Manager", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Miguel", "Angel", 1, 1),
       ("Bob", "DaBuilder", 2, 1),
       ("Nick", "Aledeon", 3, 2),
       ("Mickey", "Mouse", 4, 2),
       ("Jim", "Ross", 5, 2),
       ("Steven", "Strange", 6, 3),
       ("Michael", "Jackson", 7, 3),
       ("Dave", "Cook", 8, 4),
       ("Aaron", "Rodgers", 9, 4),
       ("Lionel", "Messi", 10, 5),
       ("King", "Kong", 11, 5),
       ("Optimus", "Prime", 12, 5);