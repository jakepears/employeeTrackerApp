-- Insert sample departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Jake', 'Pearson', 1, NULL),
  ('Aubrey', 'Drake', 2, 1),
  ('Tupac', 'Shakur', 3, NULL),
  ('Don', 'Toliver', 4, 3),
  ('Morgan', 'Wallen', 5, NULL),
  ('Post', 'Mallone', 6, NULL),
  ('Snoop', 'Dogg', 7, 6),
  ('Doctor', 'Dre', 3, 2);