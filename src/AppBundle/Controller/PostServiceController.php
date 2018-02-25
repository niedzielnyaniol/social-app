<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Post;
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
            'post' => $post->getRest()
        ]);
    }
}
