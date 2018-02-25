<?php
/**
 * Created by PhpStorm.
 * User: Maciek
 * Date: 25.02.2018
 * Time: 09:32
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FriendRepository")
 * @ORM\Table(name="friends")
 */
class Friends
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="requestsSend")
     */
    private $user1;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="invitations")
     */
    private $user2;

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
    public function getUser1()
    {
        return $this->user1;
    }

    /**
     * @param mixed $user1
     */
    public function setUser1($user1)
    {
        $this->user1 = $user1;
    }

    /**
     * @return mixed
     */
    public function getUser2()
    {
        return $this->user2;
    }

    /**
     * @param mixed $user2
     */
    public function setUser2($user2)
    {
        $this->user2 = $user2;
    }
}