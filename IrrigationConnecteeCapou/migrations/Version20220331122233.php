<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220331122233 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE card (id INT AUTO_INCREMENT NOT NULL, state_id INT NOT NULL, lora INT NOT NULL, date VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, function VARCHAR(255) NOT NULL, INDEX IDX_161498D35D83CC1 (state_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE measure (id INT AUTO_INCREMENT NOT NULL, measure_type_id INT NOT NULL, date VARCHAR(255) NOT NULL, time VARCHAR(255) NOT NULL, gps VARCHAR(255) NOT NULL, value INT NOT NULL, INDEX IDX_800719255E3758EB (measure_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE measure_type (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE plot (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, file_path VARCHAR(255) NOT NULL, area DOUBLE PRECISION NOT NULL, color VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE plot_user (plot_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_6A37401B680D0B01 (plot_id), INDEX IDX_6A37401BA76ED395 (user_id), PRIMARY KEY(plot_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reset_password_request (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, selector VARCHAR(20) NOT NULL, hashed_token VARCHAR(100) NOT NULL, requested_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', expires_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_7CE748AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE state (id INT AUTO_INCREMENT NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, phone_number VARCHAR(20) NOT NULL, address VARCHAR(255) DEFAULT NULL, zipcode VARCHAR(5) DEFAULT NULL, city VARCHAR(150) DEFAULT NULL, color VARCHAR(7) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE valve (id INT AUTO_INCREMENT NOT NULL, state TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE valve_user (valve_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_1594970DBE80C172 (valve_id), INDEX IDX_1594970DA76ED395 (user_id), PRIMARY KEY(valve_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D35D83CC1 FOREIGN KEY (state_id) REFERENCES state (id)');
        $this->addSql('ALTER TABLE measure ADD CONSTRAINT FK_800719255E3758EB FOREIGN KEY (measure_type_id) REFERENCES measure_type (id)');
        $this->addSql('ALTER TABLE plot_user ADD CONSTRAINT FK_6A37401B680D0B01 FOREIGN KEY (plot_id) REFERENCES plot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE plot_user ADD CONSTRAINT FK_6A37401BA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE reset_password_request ADD CONSTRAINT FK_7CE748AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE valve_user ADD CONSTRAINT FK_1594970DBE80C172 FOREIGN KEY (valve_id) REFERENCES valve (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE valve_user ADD CONSTRAINT FK_1594970DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE measure DROP FOREIGN KEY FK_800719255E3758EB');
        $this->addSql('ALTER TABLE plot_user DROP FOREIGN KEY FK_6A37401B680D0B01');
        $this->addSql('ALTER TABLE card DROP FOREIGN KEY FK_161498D35D83CC1');
        $this->addSql('ALTER TABLE plot_user DROP FOREIGN KEY FK_6A37401BA76ED395');
        $this->addSql('ALTER TABLE reset_password_request DROP FOREIGN KEY FK_7CE748AA76ED395');
        $this->addSql('ALTER TABLE valve_user DROP FOREIGN KEY FK_1594970DA76ED395');
        $this->addSql('ALTER TABLE valve_user DROP FOREIGN KEY FK_1594970DBE80C172');
        $this->addSql('DROP TABLE card');
        $this->addSql('DROP TABLE measure');
        $this->addSql('DROP TABLE measure_type');
        $this->addSql('DROP TABLE plot');
        $this->addSql('DROP TABLE plot_user');
        $this->addSql('DROP TABLE reset_password_request');
        $this->addSql('DROP TABLE state');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE valve');
        $this->addSql('DROP TABLE valve_user');
    }
}
