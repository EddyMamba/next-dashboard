import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  // 1. Récupération de l'id depuis l'URL
  const params = await props.params;
  const id = params.id;

  // 2. Récupération parallèle de la facture et de la liste des clients
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

    if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* 3. Transmission des données au formulaire */}
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}