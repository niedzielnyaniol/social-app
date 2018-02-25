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
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FriendRequestRepository")
 * @ORM\Table(name="friends_request")
 */
class FriendsRequest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(name="user_send_id")
     */
    private $userSend;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(name="user_recipient_id")
     */
    private $userRecipient;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

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
    public function getUserSend()
    {
        return $this->userSend;
    }

    /**
     * @param mixed $userSend
     */
    public function setUserSend($userSend)
    {
        $this->userSend = $userSend;
    }

    /**
     * @return mixed
     */
    public function getUserRecipient()
    {
        return $this->userRecipient;
    }

    /**
     * @param mixed $userRecipient
     */
    public function setUserRecipient($userRecipient)
    {
        $this->userRecipient = $userRecipient;
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
}