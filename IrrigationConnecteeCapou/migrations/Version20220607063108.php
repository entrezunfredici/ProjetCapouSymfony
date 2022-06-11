<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220607063108 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE measure ADD card_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE measure ADD CONSTRAINT FK_8007192547706F91 FOREIGN KEY (card_id_id) REFERENCES card (id)');
        $this->addSql('CREATE INDEX IDX_8007192547706F91 ON measure (card_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE measure DROP FOREIGN KEY FK_8007192547706F91');
        $this->addSql('DROP INDEX IDX_8007192547706F91 ON measure');
        $this->addSql('ALTER TABLE measure DROP card_id_id');
    }
}
