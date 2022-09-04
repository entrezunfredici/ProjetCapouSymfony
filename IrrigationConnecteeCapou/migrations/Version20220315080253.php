<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220315080253 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE card CHANGE date date VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE location location VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE function function VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE measure CHANGE date date VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE time time VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE gps gps VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE measure_type CHANGE type type VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE messenger_messages CHANGE body body LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE headers headers LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE queue_name queue_name VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE plot CHANGE name name VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE file_path file_path VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE color color VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE profile CHANGE name name VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE reset_password_request CHANGE selector selector VARCHAR(20) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE hashed_token hashed_token VARCHAR(100) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE state CHANGE description description VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(180) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:json)\', CHANGE password password VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE last_name last_name VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE first_name first_name VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE user_id user_id VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}