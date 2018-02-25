<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180225123236 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE70694B9E2071');
        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE706969E3F37A');
        $this->addSql('DROP INDEX IDX_21EE70694B9E2071 ON friends');
        $this->addSql('DROP INDEX IDX_21EE706969E3F37A ON friends');
        $this->addSql('ALTER TABLE friends ADD user1_id INT DEFAULT NULL, ADD user2_id INT DEFAULT NULL, DROP user_send_id, DROP user_recipient_id');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE706956AE248B FOREIGN KEY (user1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE7069441B8B65 FOREIGN KEY (user2_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_21EE706956AE248B ON friends (user1_id)');
        $this->addSql('CREATE INDEX IDX_21EE7069441B8B65 ON friends (user2_id)');
        $this->addSql('ALTER TABLE friends_request DROP FOREIGN KEY FK_BCFC791F441B8B65');
        $this->addSql('ALTER TABLE friends_request DROP FOREIGN KEY FK_BCFC791F56AE248B');
        $this->addSql('DROP INDEX IDX_BCFC791F56AE248B ON friends_request');
        $this->addSql('DROP INDEX IDX_BCFC791F441B8B65 ON friends_request');
        $this->addSql('ALTER TABLE friends_request ADD user_send_id INT DEFAULT NULL, ADD user_recipient_id INT DEFAULT NULL, DROP user2_id, DROP user1_id');
        $this->addSql('ALTER TABLE friends_request ADD CONSTRAINT FK_BCFC791F4B9E2071 FOREIGN KEY (user_send_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE friends_request ADD CONSTRAINT FK_BCFC791F69E3F37A FOREIGN KEY (user_recipient_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_BCFC791F4B9E2071 ON friends_request (user_send_id)');
        $this->addSql('CREATE INDEX IDX_BCFC791F69E3F37A ON friends_request (user_recipient_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE706956AE248B');
        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE7069441B8B65');
        $this->addSql('DROP INDEX IDX_21EE706956AE248B ON friends');
        $this->addSql('DROP INDEX IDX_21EE7069441B8B65 ON friends');
        $this->addSql('ALTER TABLE friends ADD user_send_id INT DEFAULT NULL, ADD user_recipient_id INT DEFAULT NULL, DROP user1_id, DROP user2_id');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE70694B9E2071 FOREIGN KEY (user_send_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE706969E3F37A FOREIGN KEY (user_recipient_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_21EE70694B9E2071 ON friends (user_send_id)');
        $this->addSql('CREATE INDEX IDX_21EE706969E3F37A ON friends (user_recipient_id)');
        $this->addSql('ALTER TABLE friends_request DROP FOREIGN KEY FK_BCFC791F4B9E2071');
        $this->addSql('ALTER TABLE friends_request DROP FOREIGN KEY FK_BCFC791F69E3F37A');
        $this->addSql('DROP INDEX IDX_BCFC791F4B9E2071 ON friends_request');
        $this->addSql('DROP INDEX IDX_BCFC791F69E3F37A ON friends_request');
        $this->addSql('ALTER TABLE friends_request ADD user2_id INT DEFAULT NULL, ADD user1_id INT DEFAULT NULL, DROP user_send_id, DROP user_recipient_id');
        $this->addSql('ALTER TABLE friends_request ADD CONSTRAINT FK_BCFC791F441B8B65 FOREIGN KEY (user2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE friends_request ADD CONSTRAINT FK_BCFC791F56AE248B FOREIGN KEY (user1_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_BCFC791F56AE248B ON friends_request (user1_id)');
        $this->addSql('CREATE INDEX IDX_BCFC791F441B8B65 ON friends_request (user2_id)');
    }
}
