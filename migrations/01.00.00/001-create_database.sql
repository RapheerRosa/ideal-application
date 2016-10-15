drop database if exists ideal;

create database if not exists ideal;

drop user 'guest'@'localhost';
drop user 'master'@'localhost';

create user 'guest'@'localhost' identified by 'Fg&CW2H?6TwCWMeV';
grant select on ideal.* to 'guest'@'localhost' identified by 'Fg&CW2H?6TwCWMeV';
grant insert on ideal.* to 'guest'@'localhost' identified by 'Fg&CW2H?6TwCWMeV';
grant update on ideal.* to 'guest'@'localhost' identified by 'Fg&CW2H?6TwCWMeV';
grant execute on ideal.* to 'guest'@'localhost' identified by 'Fg&CW2H?6TwCWMeV';

create user 'master'@'localhost' identified by '*82z&tze-=wJW2wqhC%4?W7gEAppjfEhC^Yu5N#K?vZL*+wqvNXtGa#7';
grant all on ideal.* to 'master'@'localhost' identified by '*82z&tze-=wJW2wqhC%4?W7gEAppjfEhC^Yu5N#K?vZL*+wqvNXtGa#7';

use ideal;

create table users(
	`id` int not null unique auto_increment primary key,
	`name` varchar(150) not null,
	`email` varchar(150) not null unique,
	`username` varchar(255) not null unique,
	`password` varchar(255) not null,
	`modified_at` datetime null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created_at` datetime not null default CURRENT_TIMESTAMP,
	`deleted` bit not null default 0
);

insert into users (name, email, username, password) values ('raphael', 'raphael.rosa2011@gmail.com', 'rapheer', '$2a$10$e524kWVK/ktWWjzVwS/m4OrcX87FyvKB8gnCoSNOnVmNdfK42N0kO');
insert into users (name, email, username, password) values ('felipe', 'raphael.rosa2011@gmail.com', 'fe.marquitos', '$2a$10$xkeG7Ea/kbDq563ExZKu7eA2OkOQzcWf.34Pfqv26EakMCEH9KmOW');
insert into users (name, email, username, password) values ('ronaldo', 'raphael.rosa2011@gmail.com', 'ronaldo', '$2a$10$x3YugstkZgynC5JmpCI6Ve1UWQS/924SwWbM1jnVzHB4wBrtsC2qK');

create table contact_type(
	`id` int not null unique auto_increment primary key,
	`description` varchar(100) not null,
	`deleted` bit default 0
);

insert into contact_type (`description`) values
	('E-mail'), ('Telefone Comercial'), ('Telefone Residencial'), ('Celular'), ('Fax');

create table clients(
	`id` int not null unique auto_increment primary key,
	`name` varchar(255) not null,
	`tradeName` varchar(255) not null,
	`cnpj` char(14) not null,
	`stateInscription` varchar(50),
	`modified_at` datetime null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	`created_at` datetime not null default CURRENT_TIMESTAMP,
	`deleted` bit not null default 0
);

-- insert into clients (`name`, `tradeName`, `cnpj`, `stateInscription`, `modified_at`, `updated_at`) values ('Raphael Rosa', 'Artdev', '12345678912345', '12345245532', now(), now());

create table clients_contacts(
	`id` int not null unique auto_increment primary key,
	`client_id` int not null,
	`contactType` int not null,
	`value` varchar(150) not null,
	`modified_at` datetime null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	`created_at` datetime not null default CURRENT_TIMESTAMP,
	`deleted` bit default 0,
	foreign key (`client_id`) references clients(`id`),
	foreign key (`contactType`) references contact_type(`id`)
);

create table manufacturers(
	`id` int not null unique auto_increment primary key,
	`name` varchar(255) not null,
	`tradeName` varchar(255) not null,
	`cnpj` char(14) not null,
	`stateInscription` varchar(50),
	`modified_at` datetime null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	`created_at` datetime not null default CURRENT_TIMESTAMP,
	`deleted` bit not null default 0
);

create table products(
	`id` int not null unique auto_increment primary key,
	`name` varchar(255) not null,
	`description` varchar(255) not null,
	`manufacturer_id` int not null,
	`created_at` datetime not null default CURRENT_TIMESTAMP,
	`modified_at` datetime null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	`deleted` bit not null default 0,
	foreign key (`manufacturer_id`) references manufacturers(`id`)
);

create table suppliers(
	`id` int not null unique auto_increment primary key,
	`name` varchar(255) not null,
	`tradeName` varchar(255) not null,
	`cnpj` char(14) not null,
	`stateInscription` varchar(50),
	`modified_at` datetime null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	`created_at` datetime not null default CURRENT_TIMESTAMP,
	`deleted` bit not null default 0
);

create table suppliers_contacts(
	`id` int not null unique auto_increment primary key,
	`supplier_id` int not null,
	`contactType` int not null,
	`value` varchar(150) not null,
	`modified_at` datetime null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	`created_at` datetime not null default CURRENT_TIMESTAMP,
	`deleted` bit default 0,
	foreign key (`supplier_id`) references suppliers(`id`),
	foreign key (`contactType`) references contact_type(`id`)
);

create table products_price_suppliers(
	`product_id` int not null,
	`supplier_id` int not null,
	`price` float not null,
	`deleted` bit default 0,
	foreign key (`product_id`) references products(`id`),
	foreign key (`supplier_id`) references suppliers(`id`)
);
