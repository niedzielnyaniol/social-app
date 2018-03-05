<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Comment;
use AppBundle\Entity\Post;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class RestController extends Controller
{
    /**
     * @Route("/api/user", name="api_user")
     */
    public function getUserAction()
    {
        /** @var User $user */
        $user = $this->getUser();
        $response = new JsonResponse();

        $response->setData($user->getRest());
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @Route("/api/user/{email}", name="api_user_email")
     */
    public function userByEmailAction($email)
    {
        $em = $this->getDoctrine()->getManager();
        /** @var User $user */
        $user = $em->getRepository('AppBundle:User')->findOneBy([
            'email' => $email
        ]);
        $response = new JsonResponse();

        $response->setData($user->getRest());
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @param EntityManager $em
     * @param array User $users
     */
    public function getPosts(EntityManager $em, $users) {
        $posts = [];
        /** @var User $user */
        foreach ($users as $user) {
            $tmpPosts = $em->getRepository('AppBundle:Post')->findBy([
                'author' => $user
            ]);

            /** @var Post $post */
            foreach ($tmpPosts as $post) {
                $comments = [];
                $tmpComments = $em->getRepository('AppBundle:Comment')->findBy([
                    'post' => $post
                ]);

                /** @var Comment $tmpComment */
                foreach ($tmpComments as $tmpComment) {
                    array_push($comments, [
                        'content' => $tmpComment->getContent(),
                        'createdAt' => $tmpComment->getCreatedAt(),
                        'author' => $tmpComment->getAuthor()->getRest(),
                    ]);
                }

                array_push($posts, [
                    'id' => $post->getId(),
                    'content' => $post->getContent(),
                    'author' => $post->getAuthor()->getRest(),
                    'createdAt' => $post->getCreatedAt(),
                    'likes' => count($post->getLikedBy()),
                    'comments' => $comments
                ]);
            }
        }

        return $posts;
    }

    /**
     * @Route("/api/table-info", name="api_table-info")
     */
    public function getTableInfoAction()
    {
        /** @var User $user */
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();
        $friends = $em->getRepository('AppBundle:Friends')->getFriends($user);

        $retUsers = array();
        $users = $em->getRepository('AppBundle:User')->findAll();
        $posts = $this->getPosts($em, $users);
        $fusers = [];

        for ($i = 0; count($fusers) < 20; $i++) {
            if ($em->getRepository('AppBundle:Friends')->areFriends($users[$i], $user) !== null
                && $users[$i]->getId() !== $user->getId()) {
                array_push($fusers, [
                    'id' => $users[$i]->getId(),
                    'name' => $users[$i]->getFirstName(),
                    'surname' => $users[$i]->getLastName(),
                    'accountCreatedAt' => $users[$i]->getAccountCreatedAt(),
                    'email' => $users[$i]->getEmail(),
                    'avatarUri' => $users[$i]->getAvatarUri(),
                    'friendsLen' => count($em->getRepository('AppBundle:Friends')->getFriends($users[$i])),
                ]);
            }
        }

        for ($i = 0; count($retUsers) < 3; $i++) {
            if (!$em->getRepository('AppBundle:Friends')->areFriends($users[$i], $user)
                && $users[$i]->getId() !== $user->getId()
                && !$em->getRepository('AppBundle:FriendsRequest')->areInvited($users[$i], $user)
            ) {
                array_push($retUsers, [
                    'id' => $users[$i]->getId(),
                    'name' => $users[$i]->getFirstName(),
                    'surname' => $users[$i]->getLastName(),
                    'accountCreatedAt' => $users[$i]->getAccountCreatedAt(),
                    'email' => $users[$i]->getEmail(),
                    'avatarUri' => $users[$i]->getAvatarUri(),
                    'friendsLen' => count($em->getRepository('AppBundle:Friends')->getFriends($users[$i])),
                ]);
            }
        }

        return new JsonResponse([
            'posts' => $posts,
            'propsedUsers' => $retUsers,
            'friendsLen' => count($friends),
            'chatFriends' => $fusers,
            'invitationsLen' => count($em->getRepository('AppBundle:FriendsRequest')->getInvitations($user))
        ]);
    }
}
