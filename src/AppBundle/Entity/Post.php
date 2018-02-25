<?php
/**
 * Created by PhpStorm.
 * User: Maciek
 * Date: 24.02.2018
 * Time: 21:17
 */

namespace AppBundle\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="post")
 */
class Post
{
    public function __construct()
    {
        $this->likedBy = new ArrayCollection();
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="posts")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $author;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinTable(name="posts_likes")
     */
    private $likedBy;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Comment", mappedBy="post")
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Friends", mappedBy="user2")
     */
    private $invitations;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Friends", mappedBy="user1")
     */
    private $requestsSend;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getInvitations()
    {
        return $this->invitations;
    }

    /**
     * @param mixed $invitations
     */
    public function setInvitations($invitations)
    {
        $this->invitations = $invitations;
    }

    /**
     * @return mixed
     */
    public function getRequestsSend()
    {
        return $this->requestsSend;
    }

    /**
     * @param mixed $requestsSend
     */
    public function setRequestsSend($requestsSend)
    {
        $this->requestsSend = $requestsSend;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getLikedBy()
    {
        return $this->likedBy;
    }

    /**
     * @param mixed $userId
     */
    public function setLikedBy($userId)
    {
        $this->likedBy[] = $userId;
    }

    public function removeLikedBy($userId)
    {
        if ($this->likedBy->contains($userId)) {{
            $this->likedBy->remove($userId);
        }}
    }

    /**
     * @return mixed
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * @param mixed $comments
     */
    public function setComments($comments)
    {
        $this->comments = $comments;
    }

    public function getRest() {
        return array(
            'id' => $this->id,
            'content' => $this->content,
            'createdAt' => $this->createdAt,
            'likedBy' => $this->likedBy,
            'author' => $this->getAuthor()->getRest(),
        );
    }
}