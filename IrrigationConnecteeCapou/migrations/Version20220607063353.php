<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220607063353 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE card DROP FOREIGN KEY FK_161498D3FAC60A19');
        $this->addSql('DROP INDEX IDX_161498D3FAC60A19 ON card');
        $this->addSql('ALTER TABLE card CHANGE plot_id_id plot_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3680D0B01 FOREIGN KEY (plot_id) REFERENCES plot (id)');
        $this->addSql('CREATE INDEX IDX_161498D3680D0B01 ON card (plot_id)');
        $this->addSql('ALTER TABLE measure DROP FOREIGN KEY FK_8007192547706F91');
        $this->addSql('DROP INDEX IDX_8007192547706F91 ON measure');
        $this->addSql('ALTER TABLE measure CHANGE card_id_id card_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE measure ADD CONSTRAINT FK_800719254ACC9A20 FOREIGN KEY (card_id) REFERENCES card (id)');
        $this->addSql('CREATE INDEX IDX_800719254ACC9A20 ON measure (card_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE card DROP FOREIGN KEY FK_161498D3680D0B01');
        $this->addSql('DROP INDEX IDX_161498D3680D0B01 ON card');
        $this->addSql('ALTER TABLE card CHANGE plot_id plot_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3FAC60A19 FOREIGN KEY (plot_id_id) REFERENCES plot (id)');
        $this->addSql('CREATE INDEX IDX_161498D3FAC60A19 ON card (plot_id_id)');
        $this->addSql('ALTER TABLE measure DROP FOREIGN KEY FK_800719254ACC9A20');
        $this->addSql('DROP INDEX IDX_800719254ACC9A20 ON measure');
        $this->addSql('ALTER TABLE measure CHANGE card_id card_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE measure ADD CONSTRAINT FK_8007192547706F91 FOREIGN KEY (card_id_id) REFERENCES card (id)');
        $this->addSql('CREATE INDEX IDX_8007192547706F91 ON measure (card_id_id)');
    }
}
