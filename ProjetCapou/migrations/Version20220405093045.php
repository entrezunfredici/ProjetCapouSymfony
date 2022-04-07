<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220405093045 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE measure CHANGE plot_id plot_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE measure ADD CONSTRAINT FK_80071925680D0B01 FOREIGN KEY (plot_id) REFERENCES plot (id)');
        $this->addSql('CREATE INDEX IDX_80071925680D0B01 ON measure (plot_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE measure DROP FOREIGN KEY FK_80071925680D0B01');
        $this->addSql('DROP INDEX IDX_80071925680D0B01 ON measure');
        $this->addSql('ALTER TABLE measure CHANGE plot_id plot_id INT NOT NULL');
    }
}
