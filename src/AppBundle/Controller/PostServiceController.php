<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Comment;
use AppBundle\Entity\Post;
use Doctrine\Common\Collections\ArrayCollection;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PostServiceController extends Controller
{
    /**
     * @Route("/api/createPost", name="api_create_post")
     */
    public function createPostAction(Request $request)
    {
        $content = $request->getContent();
        $params = json_decode($content, true);

        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository('AppBundle:User')->find($params['userId']);

        $now = new \DateTime();
        $post = new Post();
        $post->setAuthor($user);
        $post->setContent($params['content']);
        $post->setCreatedAt($now);

        $em->persist($post);
        $em->flush();

        return new JsonResponse([
            'post' => array(
                'id' => $post->getId(),
                'content' => $post->getContent(),
                'createdAt' => $post->getCreatedAt(),
                'likedBy' => $post->getLikedBy(),
                'author' => $post->getAuthor()->getRest(),
                'comments' => [],
            )
        ]);
    }

    /**
     * @Route("/api/addComment", name="api_add_comment")
     */
    public function addComment(Request $request)
    {
        $content = $request->getContent();
        $params = json_decode($content, true);

        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository('AppBundle:User')->find($params['userId']);
        $post = $em->getRepository('AppBundle:Post')->find($params['postId']);

        $now = new \DateTime();
        $comment = new Comment();
        $comment->setAuthor($user);
        $comment->setContent($params['content']);
        $comment->setCreatedAt($now);
        $comment->setPost($post);

        $em->persist($comment);
        $em->flush();

        return new JsonResponse([
            'comment' => $comment->getRest()
        ]);
    }


    /**
     * @Route("/api/triggerLike", name="api_trigger_like")
     */
    public function triggerLike(Request $request)
    {
        $content = $request->getContent();
        $params = json_decode($content, true);

        $em = $this->getDoctrine()->getManager();

        $post = $em->getRepository('AppBundle:Post')->find($params['postId']);
        /** @var ArrayCollection $likedBy */
        $likedBy = $post->getLikedBy();

        if ($likedBy->contains($this->getUser())) {
            $likedBy->remove($this->getUser());
        } else {
            $likedBy[] = $this->getUser();
        }

        $em->persist($post);
        $em->flush();

        return new JsonResponse([
            'success' => count($likedBy)
        ]);
    }
}
