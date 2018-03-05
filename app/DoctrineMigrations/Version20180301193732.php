<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180301193732 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E96A76ED395');
        $this->addSql('DROP INDEX IDX_DB021E96A76ED395 ON messages');
        $this->addSql('ALTER TABLE messages ADD user_recipient_id INT DEFAULT NULL, CHANGE user_id user_sender_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96F6C43E79 FOREIGN KEY (user_sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E9669E3F37A FOREIGN KEY (user_recipient_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_DB021E96F6C43E79 ON messages (user_sender_id)');
        $this->addSql('CREATE INDEX IDX_DB021E9669E3F37A ON messages (user_recipient_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E96F6C43E79');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E9669E3F37A');
        $this->addSql('DROP INDEX IDX_DB021E96F6C43E79 ON messages');
        $this->addSql('DROP INDEX IDX_DB021E9669E3F37A ON messages');
        $this->addSql('ALTER TABLE messages ADD user_id INT DEFAULT NULL, DROP user_sender_id, DROP user_recipient_id');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_DB021E96A76ED395 ON messages (user_id)');
    }
}
