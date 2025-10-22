'use server';

export interface ContactFormState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitContactAction(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Validation
    if (!name || name.trim().length < 2) {
      return {
        success: false,
        error: 'Please enter a valid name (at least 2 characters)',
      };
    }

    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    if (!message || message.trim().length < 10) {
      return {
        success: false,
        error: 'Please enter a message (at least 10 characters)',
      };
    }

    // Simulate API delay (replace with actual email service later)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Integrate with email service (e.g., SendGrid, Resend, etc.)
    console.log('Contact form submission:', { name, email, message });

    return {
      success: true,
      message: `Thanks for reaching out, ${name}! I'll get back to you soon.`,
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}

export async function subscribeNewsletterAction(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const email = formData.get('email') as string;

    // Validation
    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // TODO: Integrate with newsletter service (e.g., ConvertKit, Mailchimp, etc.)
    console.log('Newsletter subscription:', { email });

    return {
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}
