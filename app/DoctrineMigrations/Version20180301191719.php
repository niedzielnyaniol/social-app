<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180301191719 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE reported_posts ADD post_id INT DEFAULT NULL, DROP post');
        $this->addSql('ALTER TABLE reported_posts ADD CONSTRAINT FK_25A672F84B89032C FOREIGN KEY (post_id) REFERENCES post (id)');
        $this->addSql('CREATE INDEX IDX_25A672F84B89032C ON reported_posts (post_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE reported_posts DROP FOREIGN KEY FK_25A672F84B89032C');
        $this->addSql('DROP INDEX IDX_25A672F84B89032C ON reported_posts');
        $this->addSql('ALTER TABLE reported_posts ADD post VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, DROP post_id');
    }
}
