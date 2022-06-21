<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220616120744 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE valve ADD card_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE valve ADD CONSTRAINT FK_365A0BF74ACC9A20 FOREIGN KEY (card_id) REFERENCES card (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_365A0BF74ACC9A20 ON valve (card_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE valve DROP FOREIGN KEY FK_365A0BF74ACC9A20');
        $this->addSql('DROP INDEX UNIQ_365A0BF74ACC9A20 ON valve');
        $this->addSql('ALTER TABLE valve DROP card_id');
    }
}
