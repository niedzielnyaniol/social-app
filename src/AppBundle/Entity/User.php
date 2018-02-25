<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\Role\Role;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @ORM\Table(name="user")
 * @UniqueEntity(fields={"email"}, message="It looks like you already have an account!")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     * @ORM\Column(type="string", unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string")
     * @Assert\Choice({"male", "female"})
     */
    private $gender;

    /**
     * The encoded password
     *
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * A non-persisted field that's used to create the encoded password.
     * @Assert\NotBlank(groups={"Registration"})
     *
     * @var string
     */
    private $plainPassword;

    /**
     * @ORM\Column(type="json_array")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string")
     * @Assert\File(mimeTypes={ "image/jpg", "image/jpeg", "image/png" })
     */
    private $avatarUri;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Post", mappedBy="author")
     */
    private $posts;

    /**
     * @ORM\Column(type="datetime")
     */
    private $accountCreatedAt;

    /**
     * @return mixed
     */
    public function getPosts()
    {
        return $this->posts;
    }

    /**
     * @param mixed $posts
     */
    public function setPosts($posts)
    {
        $this->posts = $posts;
    }

    /**
     * @return mixed
     */
    public function getAccountCreatedAt()
    {
        return $this->accountCreatedAt;
    }

    /**
     * @param mixed $accountCreatedAt
     */
    public function setAccountCreatedAt($accountCreatedAt)
    {
        $this->accountCreatedAt = $accountCreatedAt;
    }

    public function getId()
    {
        return $this->id;
    }

    // needed by the security system
    public function getUsername()
    {
        return $this->email;
    }

    public function getRoles()
    {
        $roles = $this->roles;

        // give everyone ROLE_USER!
        if (!in_array('ROLE_USER', $roles)) {
            $roles[] = 'ROLE_USER';
        }

        return $roles;
    }

    public function setRoles(array $roles)
    {
        $this->roles = $roles;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getSalt()
    {
        // leaving blank - I don't need/have a password!
    }

    public function eraseCredentials()
    {
        $this->plainPassword = null;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
        // forces the object to look "dirty" to Doctrine. Avoids
        // Doctrine *not* saving this entity, if only plainPassword changes
        $this->password = null;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    public function getAvatarUri()
    {
        return $this->avatarUri;
    }

    public function setAvatarUri($avatarUri)
    {
        $this->avatarUri = $avatarUri;
    }

    public function getFullName()
    {
        return trim($this->getFirstName().' '.$this->getLastName());
    }

    /**
     * @return mixed
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * @param mixed $gender
     */
    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    public function getRest() {
        return array(
            'id' => $this->id,
            'name' => $this->firstName,
            'surname' => $this->lastName,
            'accountCreatedAt' => $this->accountCreatedAt,
            'email' => $this->email,
            'avatarUri' => $this->avatarUri,
        );
    }
}
