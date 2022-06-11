<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220523154404 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE card ADD plot_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3FAC60A19 FOREIGN KEY (plot_id_id) REFERENCES plot (id)');
        $this->addSql('CREATE INDEX IDX_161498D3FAC60A19 ON card (plot_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE card DROP FOREIGN KEY FK_161498D3FAC60A19');
        $this->addSql('DROP INDEX IDX_161498D3FAC60A19 ON card');
        $this->addSql('ALTER TABLE card DROP plot_id_id');
    }
}